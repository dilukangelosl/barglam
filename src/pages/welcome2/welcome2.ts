import { Component } from '@angular/core';
import { NavController , MenuController, App, NavParams} from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Authservice } from '../../providers/authservice';
import {StorePage} from '../store/store';
import {MybookingsPage} from '../mybookings/mybookings';
import {NewstorePage} from  '../newstore/newstore';

import {HomePage} from  '../home/home';
/*
  Generated class for the Welcome2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome2',
  templateUrl: 'welcome2.html'
})
export class Welcome2Page {
  name:any= "";
  loaded:any  = true ;
  profile:any ;
  greeting:any = "";
  constructor(public navCtrl: NavController,  public auth :Authservice, public menuCtrl:MenuController, public app:App , public params:NavParams) {

   // setTimeout(() => this.loaded = true, 2000);

  }

  setName(){

    this.auth.getUser().then((res)=>{


      this.name  = res ;

    })



  }

  bookings(){
    this.navCtrl.push(MybookingsPage);
  }

  toggle(){

    this.menuCtrl.toggle();
  }



  gotoBookings(){


    // this.navCtrl.pop();
    this.navCtrl.push(HomePage);
  }

  gotostore(){
    //this.navCtrl.pop();
    this.navCtrl.push(NewstorePage);
  }

  ionViewDidLoad() {
    console.log('Hello WelcomPage Page');
  }

  ionViewWillEnter(){
    var today = new Date().getHours();



    if (today >= 0 && today <= 11) {

      console.log("setting greeting");


      this.greeting = "Good Morning";

    }else if(today >= 12 && today <= 17) {
      console.log("setting greeting");
      this.greeting = "Good Afternoon";


    }
    else if(today >= 18 && today <= 24) {
      console.log("setting greeting");
      this.greeting = "Good Evening";



    }

  }


}
