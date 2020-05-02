import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppService} from './services/app.service';
import {Locker} from './model/locker';
import {RandomService} from './services/random.service';
import {FirebaseService} from './services/firebase.service';
import {LockerService} from './services/locker.service';

const data = {
  100001: {
    isOpen: false,
    users: [
      {
        type: 'OWNER',
        uniqueKey: '70dfbca685f7424fa7ff90845d0fa564==',
        finalKey: false,
        isInformTryingToOpen: true,
        isInformIsOpen: true,
        _id: 30001
      }
    ],
    _secreteKey: null,
    _tryingToOpen: false,
    _verifyOpen: false,
    _doOpen: false,
    _doLock: false,
    _id: 100001
  }
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  valueChangesSubscription: Subscription;

  constructor(private appService: AppService,
              private firebaseService: FirebaseService,
              private lockerService: LockerService) {
  }

  ngOnInit(): void {
    this.resetData();

    this.valueChangesSubscription = this.firebaseService.valueChanges('lockers/100001/')
      .subscribe((locker: Locker) => {
        if (!locker._secreteKey) {
          this.appService.handleLockersState(locker);
        }
      });
    // this contains root file to the access the db
    // if the lockers have to face some changes it will detect to the subscribe
  }

  public unsubscribeAll() {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  public resetData(): void {
    this.firebaseService.setObject('lockers', data);
    this.firebaseService.setObject('users', null);
    this.firebaseService.unsubscribeAll();
    this.appService.unsubscribeAll();
    this.unsubscribeAll();
  }

  public tryingToOpen() {
    this.lockerService.tryingToOpen('100001');
  }

  public lock() {
    this.lockerService.lockLocker('100001');
    this.resetData();
  }
}
