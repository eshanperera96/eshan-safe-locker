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

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnDestroy {

  private verifyOpenSubscription: Subscription;
  private decryptedCodeSubscription: Subscription;

  constructor(private db: AngularFireDatabase,
              private keyService: KeyService,
              private firebaseService: FirebaseService,
              private responseService: ResponseService) {
  }

  public handleLockersState(locker: Locker): void {
    // identify taring to open
    if (locker._tryingToOpen) {
      this.handleTryingToOpen(locker);

      // set a timeout for if trying to open method is false (3 sec)
      locker._tryingToOpen = false;
      this.firebaseService.resetObject(`lockers/${locker._id}`, locker, 3000);
    }
  }

  private handleTryingToOpen(locker: Locker): void {
    const user = locker.users.find(usr => usr.type === 'OWNER');
    const secreteKey: SecreteKey = this.keyService.generateKey(user.uniqueKey);

    locker._secreteKey = secreteKey;
    this.firebaseService.updateObject(`lockers/${locker._id}`, locker);

    this.responseService.responseUser(user, secreteKey.encryptedKey, `Trying To Open Locker: ${locker._id}`, MessageType.ALERT);

    //  listen verifyOpen
    this.verifyOpenSubscription = this.firebaseService.valueChanges(`lockers/${locker._id}/_verifyOpen`)
      .subscribe(verifyOpen => {
        if (verifyOpen === true) {
          this.handleVerifyOpen(locker, user, secreteKey);
        }
      });
  }

  private handleVerifyOpen(locker: Locker, user: User, secreteKey: SecreteKey): void {
    this.responseService.responseUser(user, secreteKey.decryptedKey, 'Decrypt Key', MessageType.INFO);

    // listen decryptedCode
    this.decryptedCodeSubscription = this.firebaseService.valueChanges(`lockers/${locker._id}/users/0/decryptedCode`)
      .subscribe((decryptedCode: SecreteKey) => {
        if (decryptedCode) {
          this.handleVerifyDecryptedCode(locker, secreteKey, decryptedCode);
        }
      });
  }

  private handleVerifyDecryptedCode(locker: Locker, systemSecreteKey: SecreteKey, userSecreteKey: SecreteKey): void {
    if (this.keyService.verifySecreteKey(systemSecreteKey, userSecreteKey)) {
      locker._doOpen = true;
      this.firebaseService.updateObject(`lockers/${locker._id}`, locker);
    } else {
      locker._doLock = true;
      this.firebaseService.updateObject(`lockers/${locker._id}`, locker);
    }
  }

  ngOnDestroy(): void {
    if (this.verifyOpenSubscription) {
      this.verifyOpenSubscription.unsubscribe();
      this.decryptedCodeSubscription.unsubscribe();
    }
  }
}
