import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Locker} from '../model/locker';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  constructor(private firebaseService: FirebaseService) { }

  public openLocker(locker: Locker) {
    this.firebaseService.updateObject(`lockers/${locker._id}`, {_doLock: false, _doOpen: true, _tryingToOpen: false, _verifyOpen: false});
  }

  public lockLocker(locker: Locker) {
    this.firebaseService.updateObject(`lockers/${locker._id}`, {_doLock: true, _doOpen: false, _tryingToOpen: false, _verifyOpen: false});
  }
}
