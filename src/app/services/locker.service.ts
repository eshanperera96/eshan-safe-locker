import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Locker} from '../model/locker';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  constructor(private firebaseService: FirebaseService) { }

  public tryingToOpen(lockerId: string): void {
    this.firebaseService.updateObject(`lockers/${lockerId}`, {_tryingToOpen: true});
  }

  public openLocker(lockerId: string): void {
    console.log('openLocker');
    this.firebaseService.updateObject(`lockers/${lockerId}`, {_doLock: false, _doOpen: true, _tryingToOpen: false});
  }

  public lockLocker(lockerId: string) {
    console.log('lockLocker');
    this.firebaseService.updateObject(`lockers/${lockerId}`, {_doLock: true, _doOpen: false, _tryingToOpen: false, _verifyOpen: false});
    window.location.reload();
  }
}
