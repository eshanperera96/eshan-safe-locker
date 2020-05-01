import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

const firebaseConfig = {
  apiKey: 'AIzaSyBBayltOGFkdXc_d-ml-mUuS6k1vaHXBPo',
  authDomain: 'eshan-safe-locker.firebaseapp.com',
  databaseURL: 'https://eshan-safe-locker.firebaseio.com',
  projectId: 'eshan-safe-locker',
  storageBucket: 'eshan-safe-locker.appspot.com',
  messagingSenderId: '624508811763',
  appId: '1:624508811763:web:c8f06a21171737bd2afa86',
  measurementId: 'G-E56TW39FY1' //set the firebase info to deploy the javascript file to app service
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
