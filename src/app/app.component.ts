import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , AlertController} from 'ionic-angular';
import { StatusBar, Splashscreen   } from 'ionic-native';
import { Push} from '@ionic/cloud-angular';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {LoginPage} from '../pages/login/login';

import {Welcome2Page} from '../pages/welcome2/welcome2';
import { Authservice } from '../providers/authservice';
import {AngularFire} from 'angularfire2';
import {MyordersPage} from '../pages/myorders/myorders';
import {AboutPage} from '../pages/about/about';
import {MybookingsPage} from '../pages/mybookings/mybookings';

/*
import * as firebase from 'firebase';
*/


@Component({
  templateUrl: 'app.html',
  providers:[Authservice]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;



verifieduser:boolean = null;
  rootPage: any ;
  fireAuth: any;
  pages: Array<{title: string, component: any}>;


  constructor(public platform: Platform,public af: AngularFire, public auth:Authservice , public push:Push ,public alertCtrl: AlertController) {





/*
if(!BackgroundMode.isEnabled()){

  console.log("Background Mode Enabled");
  BackgroundMode.enable();
}
*/





    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });



/*
    var config = {
      apiKey: "AIzaSyCW22GltSLGEP777T_oIRYx6GKhr0t_vbU",
      authDomain: "glambardemo.firebaseapp.com",
      databaseURL: "https://glambardemo.firebaseio.com",
      storageBucket: "glambardemo.appspot.com",
      messagingSenderId: "153354299040"
    };


   AngularFireModule.initializeApp(config);


*/

   // this.fireAuth = firebase.auth();


    af.auth.subscribe( user => {
      if (user) {

      console.log(user);

      this.verifieduser = user["auth"]["emailVerified"];

      if(!this.verifieduser){

        let alert = this.alertCtrl.create({
          title: 'Email Verification',
          message: 'Please verify your Email Address',
          buttons: [
            {
              text: 'Cancel',
              handler: () => {

              }
            },

            {
              text: 'Resend Email',
              handler: () => {
               this.auth.sendVerification();
              }
            }
          ]
        });
        alert.present();

      }



       this.rootPage = Welcome2Page;
      } else {

        this.rootPage = LoginPage;
      }
    });



    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

  }


bookings(){

  this.nav.push(MybookingsPage);
}

about(){
  this.nav.push(AboutPage);
}


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
   StatusBar.styleDefault();
      Splashscreen.hide();
/*
      StatusBar.overlaysWebView( false );
      StatusBar.backgroundColorByHexString('#209dc2');
      StatusBar.styleLightContent();

      */

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  myorders(){

    this.nav.push(MyordersPage);
  }


  logout(){
   this.auth.logoutUser();

    this.nav.setRoot(LoginPage);
  }

  gotohome() {

    this.nav.setRoot(Welcome2Page);
  }

}
