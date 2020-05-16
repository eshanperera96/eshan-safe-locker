import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Locker} from '../model/locker';
import {User, UserType} from '../model/user';
import {MessageType} from '../model/message';
import {KeyService} from './key.service';
import {Subscription} from 'rxjs';
import {SecreteKey} from '../model/secrete-key';
import {FirebaseService} from './firebase.service';
import {ResponseService} from './response.service';
import {LockerService} from './locker.service';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  private verifyOpenSubscription: Subscription;
  private decryptedCodeSubscription: Subscription;
  private firebaseSubjectSubscription: Subscription;


  constructor(private db: AngularFireDatabase,
              private keyService: KeyService,
              private firebaseService: FirebaseService,
              private responseService: ResponseService,
              private lockerService: LockerService) {
  }

  public handleLockersState(locker: Locker): void {
    // identify taring to open
    if (locker._tryingToOpen) {
      this.handleTryingToOpen(locker);

      // set a timeout for if trying to open method is false (3 sec)
      locker._tryingToOpen = false;
      this.firebaseService.resetObject(`lockers/${locker._id}`, {_tryingToOpen: false}, 3000);
    }
  }

  private handleTryingToOpen(locker: Locker): void {
    const user = locker.users.find(usr => usr.type === 'OWNER');
    const secreteKey: SecreteKey = this.keyService.generateKey(user.uniqueKey);

    this.firebaseService.updateObject(`lockers/${locker._id}`, {_secreteKey: secreteKey});

    this.responseService.responseUser(user, `Trying To Open Locker: ${locker._id}`, MessageType.ALERT, secreteKey.key);

    //  listen verifyOpen
    this.verifyOpenSubscription = this.firebaseService.valueChanges(`lockers/${locker._id}/_verifyOpen`)
      .subscribe(verifyOpen => {
        if (verifyOpen === true) {
          this.handleVerifyOpen(locker, user, secreteKey);

        }
      });
  }

  private handleVerifyOpen(locker: Locker, user: User, secreteKey: SecreteKey): void {
    console.log('handleVerifyOpen');
    // this.firebaseService.resetObject(`lockers/${locker._id}`, {_verifyOpen: false}, 20000);
    // this.responseService.responseUser(user, secreteKey.decryptedKey, 'Decrypt Key', MessageType.INFO);

    // listen decryptedCode
    this.decryptedCodeSubscription = this.firebaseService.valueChanges(`lockers/${locker._id}/users/0/finalKey`)
      .subscribe((decryptedCode: any) => {
        if (decryptedCode) {
          const userSecreteKey: SecreteKey = {
            key: null,
            finalKey: decryptedCode
          };
          this.handleVerifyDecryptedCode(locker, secreteKey, userSecreteKey);
        }
      });
  }

  private handleVerifyDecryptedCode(locker: Locker, systemSecreteKey: SecreteKey, userSecreteKey: SecreteKey): void {
    console.log('handleVerifyDecryptedCode');
    if (this.keyService.verifySecreteKey(systemSecreteKey, userSecreteKey)) {
      this.firebaseService.valueChanges(`lockers/${locker._id}/_verifyOpen`).subscribe(verifyOpen => {
        if (verifyOpen === true) {
          this.lockerService.openLocker(locker._id);
        } else if (verifyOpen === false) {
          this.lockerService.lockLocker(locker._id);
        }
      });
    } else {
      this.lockerService.lockLocker(locker._id);
    }
  }

  unsubscribeAll() {
    if (this.verifyOpenSubscription) {
      this.verifyOpenSubscription.unsubscribe();
    }
    if (this.decryptedCodeSubscription) {
      this.decryptedCodeSubscription.unsubscribe();
    }
    if (this.firebaseSubjectSubscription) {
      this.firebaseSubjectSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
