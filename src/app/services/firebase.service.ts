import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  public setObject(pathOrRef: string, data: any, successMsg?: string, errorMsg?: string): void {
    const promise: Promise<void> = this.db.object(pathOrRef).set(data);
    this.handleHandle(promise, successMsg, errorMsg);
  }

  public updateObject(pathOrRef: string, data: any, successMsg?: string, errorMsg?: string): void {
    const promise: Promise<void> = this.db.object(pathOrRef).update(data);
    this.handleHandle(promise, successMsg, errorMsg);
  }

  public valueChanges(pathOrRef: string, isList?: boolean): any {
    if (isList) {
      return this.db.list(pathOrRef).valueChanges();
    } else {
      return this.db.object(pathOrRef).valueChanges();
    }
  }

  public resetObject(pathOrRef, defaultObj, timeout: number) {
    setTimeout(() => this.updateObject(pathOrRef, defaultObj), timeout);
  }

  private handleHandle(promise: Promise<void>, successMsg?: string, errorMsg?: string): void {
    if (!successMsg) {
      successMsg = 'success';
    }
    if (!errorMsg) {
      errorMsg = 'You dont have access!';
    }
    promise.then(_ => console.log(successMsg))
      .catch(err => console.error(err, errorMsg));
  }
}
