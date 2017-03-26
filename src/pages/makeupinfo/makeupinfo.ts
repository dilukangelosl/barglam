import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {Makeupservice} from '../../providers/makeupservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { PhotoViewer } from 'ionic-native';
import {BookingsPage} from '../bookings/bookings'

/*
  Generated class for the Makeupinfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-makeupinfo',
  templateUrl: 'makeupinfo.html',
  providers:[Makeupservice]
})
export class MakeupinfoPage {

  public makeup:any ;
  public portfolio:FirebaseListObservable<any[]>;
  public bridal:FirebaseListObservable<any[]>;
  public commercial:FirebaseListObservable<any[]>;
  public specialfx:FirebaseListObservable<any[]>;
  public specialoccations:FirebaseListObservable<any[]>;
  public makeupsegment:any = 'about';
  ratings:any ;


  showbridal:any = false;
  showcommercial:any = false;
  showspeialfx:any =false;
  showspecialoccations:any =false;

  a1:any = false;
  a2:any = false;
  a3:any = false;
  a4:any = false


  reviews:any ;


  constructor(public navCtrl: NavController, public params:NavParams, public makeupservice:Makeupservice) {


this.ratings = 5 ;


    //dummy reviews


    this.reviews = [
      {
        user:"Diluk Angelo",
        rating: 3,
        message: "Slow Feed Back"
      },

      {
        user:"Shaheed Shameel",
        rating: 5,
        message: "The Best !!!!"
      },

      {
        user:"Rahul Hettiarahchi",
        rating: 1,
        message: "Still im ugly"
      },

      {
        user:"Lal Ayiya",
        rating: 4.5,
        message: "Made me Cute in minutes"
      }
    ];


    this.makeup = params.get('makeup');
    //console.log(this.store);

   // console.log(this.store.$key);



    this.bridal = this.makeupservice.getService(this.makeup.$key,'bridal');
    this.commercial = this.makeupservice.getService(this.makeup.$key,'commercialandtv');
    this.specialfx = this.makeupservice.getService(this.makeup.$key,'specialfx');
    this.specialoccations = this.makeupservice.getService(this.makeup.$key,'specialoccasions');
  this.portfolio = this.makeupservice.getPortfolio(this.makeup.$key);



    this.bridal.subscribe((res)=> {


      if(res.length > 0) {
        this.showbridal = true;
      }


    })


    this.commercial.subscribe((res) => {
      if(res.length > 0) {
        this.showcommercial = true ;
      }

    })


    this.specialfx.subscribe((res) => {

      if(res.length > 0) {
        console.log("Special Fx Service")
        console.log(res);
        this.showspeialfx = true ;
      }


    })


    this.specialoccations.subscribe((res) => {



      if(res.length > 0) {
        this.showspecialoccations = true;
      }
    })







  }


  openclose(a:any){

if(a == 1) {

  this.a1 = !this.a1;
}

else if (a == 2) {
  this.a2 = !this.a2;
}

else if ( a == 3) {

  this.a3 = !this.a3 ;

}
else if ( a == 4 ) {
  this.a4 =  !this.a4 ;

}


  }


  ionViewDidLoad() {
    console.log('Hello MakeupinfoPage Page');
  }


  openport(imageurl:any){
    console.log("opening Port");
    PhotoViewer.show(imageurl);
  }

  book(selected:any, catnumber:any){


    if(selected != '') {
      selected.cat = catnumber;
    }

    this.navCtrl.push(BookingsPage,{type:"makeup", typeid:this.makeup.$key, selected:selected,typename:this.makeup.name, typekey:this.makeup.$key, makeup:this.makeup});
  }

}
