import { Component,ViewChild  } from '@angular/core';
import { NavController, NavParams, AlertController ,Content , ModalController, LoadingController } from 'ionic-angular';
import {Photoservice} from '../../providers/photoservice';
import {Bookinservice} from  '../../providers/bookinservice';
import  {Authservice} from '../../providers/authservice';
import {HomePage} from '../home/home';
import { DatePicker } from 'ionic-native';
import {PhotobookingselectPage} from '../photobookingselect/photobookingselect';

import * as moment from 'moment';
/*
  Generated class for the Photobooking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photobooking',
  templateUrl: 'photobooking.html',
  providers : [Photoservice,Bookinservice,Authservice]
})
export class PhotobookingPage {

  //var
  @ViewChild('timebox') sTime;
  @ViewChild('datebox') sDate;
  typename:any;
  userid:any ;
  displaytime :any ;
  displaydate:any ;
  myprofile:any ;
  event:any = {};
  services:any[] = [] ;
  typeid:any;
  type:any ;
  selected:any = [];
  service:any ;
  typekey:any;
  numberofcustomers:any[] = [];

  //additional shit

  makeup:any;

  modalselected:any[] = [];






  constructor(public navCtrl: NavController, public makeupservice: Photoservice, public params:NavParams, public bookingservice:Bookinservice, public auth:Authservice, public alertCtrl:AlertController, public  modalCtrl:ModalController, public loadingCtrl:LoadingController) {


    this.userid =  this.auth.getAuth().uid;

    this.event.date = new Date().toISOString();
    this.event.timeStarts = new Date().toISOString();


    var d = new Date();


    this.auth.getuser2().then((val)=>{

     console.log(val);
      this.myprofile = val ;
    })


    this.numberofcustomers = [

      {number:1},
      {number:2},
      {number:3},
      {number:4},
      {number:5},
      {number:6},
      {number:7},
      {number:8},
      {number:9},
      {number:10}

    ];


    this.event.numberofcus  = 1;


    this.setTime(d);
    this.setMonth(d);

    this.typename = params.get("typename");

    this.makeup = params.get("makeup");
    var se =params.get("selected");
    if(se != ''){
      this.selected.push(se);

    }


    this.typeid =  params.get("typeid");


    this.type = params.get("type");
    console.log(params.get("selected") + "   " + this.type);

    this.typekey = params.get("typekey");
    var id = this.selected.$key;








  }



  setMonth(d:any){
    var day = d.getDate();

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var month = monthNames[d.getMonth()];

    var fday = "";

    if(day < 10) {

      fday = "0" +day;
    }
    else {

      fday = day;
    }


    this.displaydate = {

      day:fday,
      month:month

    }



  }

  setTime(a:any){




    var d = new Date(a);


    var hours = d.getHours() ;
    hours = (hours+24)%24;
    var min = d.getMinutes() ;

    var fmin = "";
    var fhours = "";


    var mid='AM';
    if(hours==0){ //At 00 hours we need to show 12 am
      hours=12;
    }
    else if(hours>12)
    {
      hours=hours%12;
      mid='PM';
    }


    if(hours < 10) {

      fhours = "0"+hours.toString();
    }

    else {
      fhours = hours.toString() + "";

    }
    if(min < 10){
      fmin = "0"+min.toString();

    }

    else {

      fmin = +min.toString() + "";
    }



    this.displaytime = {
      hours : fhours ,
      minutes: fmin ,
      ampm:mid

    };

  }


  changeDate(a:any){


    var date = moment(a);
    var dateComponent = date.utc().format('YYYY-MM-DD');
    var timeComponent = date.utc().format('HH:mm:ss');


    var res = dateComponent + " "+timeComponent;
    console.log(res);
    // var d = new Date(res);

    var d = new Date(res.replace(' ', 'T'));





    var day = d.getDate();

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var month = monthNames[d.getMonth()];

    var fday = "";

    if(day < 10) {

      fday = "0" +day;
    }
    else {

      fday = day + "";
    }


    this.displaydate = {

      day:fday,
      month:month

    }

  }

  changetime(a:any){


    var date = moment(a);
    var dateComponent = date.utc().format('MM/DD/YYYY');
    var timeComponent = date.utc().format('hh:mm:ss');


    var res = dateComponent + " "+timeComponent;
    console.log(date.format('MM/DD/YYYY'));
    console.log(dateComponent);
    console.log(res);
    var d = new Date(res);

    // console.log(res);


    //var d2 = new Date(res.replace(' ', 'T'));
    console.log("time "+ d);
    var hours = d.getHours() ;



    hours = (hours+24)%24;
    var min = d.getMinutes() ;

    var fmin = "";
    var fhours = "";


    var mid='AM';
    if(hours==0){ //At 00 hours we need to show 12 am
      hours=12;
    }
    else if(hours>12)
    {
      hours=hours%12;
      mid='PM';
    }


    if(hours < 10) {

      fhours = "0"+hours.toString();
    }

    else {
      fhours = hours.toString() + "";

    }
    if(min < 10){
      fmin = "0"+min.toString();

    }

    else {

      fmin = +min.toString() + "";
    }



    this.displaytime = {
      hours : fhours ,
      minutes: fmin ,
      ampm:mid

    };

  }

  checkTime(i:any) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }


  showselect() {
    let contactModal = this.modalCtrl.create(PhotobookingselectPage, {id:this.typeid, selected:this.selected});
    contactModal.onDidDismiss((data)=>{


      this.selected =  data.selected;
      console.log(this.selected);



    })


    contactModal.present();
  }


  openTime(i:any){


    if(i ==1){
      this.sTime.open();
    }

  }


  openDate(){

    this.sDate.open();
  }


  d(){

    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: 2
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );

  }


  search(nameKey:any, myArray:any[]){
    console.log("searching started " +  myArray.length);
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i].$key === nameKey) {
        console.log(myArray[i].$ke + " == " + nameKey);
        return myArray[i];
      }
      else {

        console.log("False "+myArray[i].$ke + " == " + nameKey);

      }
    }
  }

  requestbooking() {


    if (this.selected.length > 0) {

      let loading = this.loadingCtrl.create({
        content: 'Requesting booking...'
      });

      loading.present();

      var filteredselected = [];
      console.log(this.selected);


      for (var i = 0; i < this.selected.length; i++) {

        filteredselected.push({
          id: this.selected[i].$key,
          name: this.selected[i].name,
          price: this.selected[i].price,
          cat: this.selected[i].cat

        })

      }


      // var s = this.search(this.service,this.services);

      // console.log(s);
      this.event["name"] = this.typename;
      this.event["status"] = "Pending";
      this.event["message"] = "";
      this.event["type"] = "Photographers";
      this.event["dbnode"] = "photographers";
      this.event["typekey"] = this.typekey;
      this.event["service"] = filteredselected;
      this.event["user"] = {
        name: this.myprofile.name,
        phone: this.myprofile.phone,
        verified: this.myprofile.verified,
        id: this.myprofile.$key
      }


      delete this.makeup["$key"];
      delete this.makeup["$exists"];
      this.event["makeup"] = this.makeup;


      this.bookingservice.request(this.auth.getAuth().uid, 'photographers', this.typeid, this.event).then((res) => {


        let alert = this.alertCtrl.create({
          title: 'Booking Requested Successfully',
          subTitle: 'You will be notified when the booking is Confirmed, Thank you',
          buttons: ['OK']
        });
        loading.dismiss()
        alert.present();

        this.navCtrl.setRoot(HomePage);

      })

    }
    else {


      let alert = this.alertCtrl.create({
        title: 'Booking Failed',
        subTitle: 'Please Select a Service',
        buttons: ['Dismiss']
      });
      alert.present();
    }

  }

  ionViewDidLoad() {
    console.log('Hello PhotobookingPage Page');
  }

}
