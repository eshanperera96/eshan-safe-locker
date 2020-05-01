import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AppService} from './services/app.service';
import {Locker} from './model/locker';
import {RandomService} from './services/random.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eshan-safe-locker';

  valueChangesSubscription: Subscription;

  constructor(private db: AngularFireDatabase, private appService: AppService, private randomService: RandomService) {
  }

  ngOnInit(): void {
    this.generate();
    // this.valueChangesSubscription = this.db
    //   .object('lockers/100001')
    //   .valueChanges()
    //   .subscribe((locker: Locker) => this.appService.handleLockersState(locker));
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
