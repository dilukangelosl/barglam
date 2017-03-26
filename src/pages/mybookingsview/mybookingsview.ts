import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Authservice} from '../../providers/authservice';
import {Bookinservice} from '../../providers/bookinservice'

/*
  Generated class for the Mybookingsview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mybookingsview',
  templateUrl: 'mybookingsview.html',
  providers:[Bookinservice, Authservice]
})
export class MybookingsviewPage {

  booking:any;
  total:any = 0;
  showcancel:any = false ;

  constructor(public navCtrl: NavController, public params:NavParams, public auth :Authservice, public bookingservice:Bookinservice) {
    this.booking = params.get("booking");


    if(this.booking.status  != "Completed") {
      this.showcancel = true;
      console.log("printing status")
      console.log(this.booking.status)
    }else {

      console.log("printing ss");
      console.log(this.booking.status)
    }


    for(var i = 0; i < this.booking.service.length; i++){

      this.total += parseInt(this.booking.service[i].price);

    }

    if(params.get("booking").makeup.homevisitcharge){
      this.total += parseInt(params.get("booking").makeup.homevisitcharge);
    }

  }

  ionViewDidLoad() {
    console.log('Hello MybookingsviewPage Page');
  }

  getDate(d:any){

    var today = new Date(d);

    var dd = today.getDate() + "";
    var mm = (today.getMonth()+1) +""; //January is 0!

    var yyyy = today.getFullYear();
    if(parseInt(dd)<10){
      dd='0'+dd;
    }
    if(parseInt(mm)<10){
      mm='0'+mm;
    }
    var t = dd+'-'+mm+'-'+yyyy;

    return t;

  }

  getTime(d:any){
    var today = new Date(d);

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

  cancelbooking(){

    this.bookingservice.cancelbooking(this.booking, this.auth.getAuth().uid).then((res)=>{
      this.navCtrl.pop();
    });

  }

  updatebooking(){

    this.bookingservice.updatebooking(this.booking, this.auth.getAuth().uid).then((res)=> {

      this.navCtrl.pop();
    })


  }

}
