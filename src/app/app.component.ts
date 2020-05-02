import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppService} from './services/app.service';
import {Locker} from './model/locker';
import {RandomService} from './services/random.service';
import {FirebaseService} from './services/firebase.service';

const data = {
  100001: {
    isOpen: false,
    users: [
      {
        type: 'OWNER',
        uniqueKey: 'VIRAJ',
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
  title = 'eshan-safe-locker';

  valueChangesSubscription: Subscription;

  constructor(private appService: AppService,
              private firebaseService: FirebaseService,
              private randomService: RandomService) {
  }

  ngOnInit(): void {
    this.firebaseService.setObject('lockers', data);

    this.valueChangesSubscription = this.firebaseService.valueChanges('lockers/100001')
      .subscribe((locker: Locker) => this.appService.handleLockersState(locker));
    // this contains root file to the access the db
    // if the lockers have to face some changes it will detect to the subscribe
  }

  generate() {
    this.title = this.randomService.generateRandomString(256);
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
}
