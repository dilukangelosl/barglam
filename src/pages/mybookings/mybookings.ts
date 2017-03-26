import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2';
import {Authservice} from '../../providers/authservice';
import {Bookinservice} from '../../providers/bookinservice';
import {MybookingsviewPage} from '../mybookingsview/mybookingsview';

/*
  Generated class for the Mybookings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mybookings',
  templateUrl: 'mybookings.html',
  providers: [Bookinservice,Authservice]
})
export class MybookingsPage {


  bookings:FirebaseListObservable<any[]>;
bk:any  = 'current';

  constructor(public navCtrl: NavController, public auth:Authservice, public bookinservice:Bookinservice) {


    this.bookings =  this.bookinservice.getMybookings(this.auth.getAuth().uid);

    this.bookings.subscribe((val)=> {

      console.log(val);
    })


  }

  ionViewDidLoad() {
    console.log('Hello MybookingsPage Page');
  }

  go(booking:any){

    this.navCtrl.push(MybookingsviewPage , {booking:booking});
  }

  getDate(d:any){

   // var t = d.split(/[^0-9]/);

// Apply each element to the Date function
   // var de = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);


    var today = new Date(d.replace(' ', 'T'));

    var dd = today.getDate() + "";
    var mm = (today.getMonth()+1) +""; //January is 0!

    var yyyy = today.getFullYear();
    if(parseInt(dd)<10){
      dd='0'+dd;
    }
    if(parseInt(mm)<10){
      mm='0'+mm;
    }
    var t2 = dd+'-'+mm+'-'+yyyy;

    return t2;

  }

  getTime(d:any){
  //  var t = d.split(/[^0-9]/);

// Apply each element to the Date function
   // var de = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);


    var today = new Date(d.replace(' ', 'T'));

    var h = today.getHours() + '';
    var m = today.getMinutes() + '';

    if(parseInt(h) < 10) {
      h = '0'+h;
    }
    if(parseInt(m) < 10){
      m = '0'+m;
    }


    return h+":"+m;


  }

}
