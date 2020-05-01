import {Injectable, OnInit} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Locker} from '../model/locker';
import {User} from '../model/user';
import {Message} from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private db: AngularFireDatabase) {
  }

  public handleLockersState(lockers: Array<Locker>): void {
    const locker: Locker = lockers[0];

    // identify taring to open
    if (locker.tryingToOpen) {
      this.handleTryingToOpen(locker);
      setTimeout(() => {
        locker.tryingToOpen = false;
        this.handleAutoResetTryingToOpen(locker);
      }, 3000);
    }

    // identify is open
    if (locker.isOpen) {
      this.handleIsOpen(locker);
    }
  }


  private handleTryingToOpen(locker: Locker): void {
    const message: Message = {
      body: `Trying To Open Locker: ${locker._id}`,
      date: new Date().toISOString()
    };
    locker.users.filter(user => user.isInformTryingToOpen)
      .forEach(value => this.informUser(value, message));
  }

  private handleIsOpen(locker: Locker) {
    locker.users.forEach(user => {
      // console.log(user);
    });
  }

  private informUser(user: User, message: Message): void {
    console.log(message);
    this.db
      .object(`users/${user._id}/messages`)
      .set(message)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You dont have access!'));
  }

  private handleAutoResetTryingToOpen(locker: Locker): void {
    this.db.object(`lockers/${locker._id}`)
      .update(locker)
      .then(_ => console.log('success'))
      .catch(err => console.log(err, 'You dont have access!'));
  }
}
