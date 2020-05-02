import {Injectable, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FirebaseApp} from '@angular/fire';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  public subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private fb: FirebaseApp, private db: AngularFireDatabase) { }

  public setObject(pathOrRef: string, data: any, successMsg?: string, errorMsg?: string): void {
    const promise: Promise<void> = this.db.object(pathOrRef).set(data);
    this.handleHandle(promise, successMsg, errorMsg);
  }

  public updateObject(pathOrRef: string, data: any, successMsg?: string, errorMsg?: string): void {
    const promise: Promise<void> = this.db.object(pathOrRef).update(data);
    this.handleHandle(promise, successMsg, errorMsg);
  }

  public valueChangesWithReset(pathOrRef: string, resetTimeOut) {
    // const parentPath = this.getParentPath(pathOrRef);
    // let previousValue = null;
    // this.fb.database().ref(pathOrRef).once('value').then((snapshot: any) => {
    //   previousValue = {[snapshot.key]: snapshot.val()};
    //   this.resetObject(parentPath, previousValue, resetTimeOut);
    // });
    // this.valueChanges(pathOrRef);
  }

  public valueOnceChanges(pathOrRef: string): void {
    this.fb.database().ref(pathOrRef).once('value').then((snapshot: any) => {
      this.subject.next(snapshot.val());
    });
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

  // private getParentPath(path: string): string {
  //   if (path.includes('/')) {
  //     const nodes = path.split('/');
  //     nodes.pop();
  //     return nodes.join('/');
  //   } else {
  //     return path;
  //   }
  // }

  public unsubscribeAll() {
    if (this.subject) {
      this.subject.unsubscribe();
    }
  }

  ngOnDestroy(): void {
  }
}
