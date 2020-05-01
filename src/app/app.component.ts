import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AppService} from './services/app.service';
import {Locker} from './model/locker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'eshan-safe-locker';

  valueChangesSubscription: Subscription;

  constructor(private db: AngularFireDatabase, private appService: AppService) {
  }

  ngOnInit(): void {
    this.valueChangesSubscription = this.db
      .list('lockers')
      .valueChanges()
      .subscribe( (lockers: Array<Locker>) => this.appService.handleLockersState(lockers) );
  }

  ngOnDestroy(): void {
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
}
