import { Component } from '@angular/core';
import { NavController, MenuController, App } from 'ionic-angular';

import {SalonsPage} from '../salons/salons';
import {PhotoPage} from '../photo/photo';
import {MakeupPage} from '../makeup/makeup';
import {StorePage} from '../store/store';
import { Authservice } from '../../providers/authservice';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [Authservice]

})
export class HomePage {

homeOptions:any;
  promos:any = [];
  havepromos:boolean = false;

  public profile:any;
  constructor(public navCtrl: NavController, public menuCtrl:MenuController, public auth:Authservice, public app :App) {

    //this.app.setScrollDisabled(true);
    this.homeOptions = {
      initialSlide: 0,
      loop: true,
      autoplay:2000,
      autoplayDisableOnInteraction: false
    };

    this.auth.getBookingPromos().subscribe((res) => {

      console.log(res);

      res.forEach((item) =>{
        console.log(item);
      this.promos.push(item);
      })


     this.havepromos = true;
    })



  }

  ionViewDidLoad() {
    console.log('Hello HomePage Page');





/*
    this.mysevrvice.getAuth().onAuthStateChanged((user)=> {

      if(!user)
      {

        this.navCtrl.setRoot(LoginPage);
      }
      else {

        this.profile = this.mysevrvice.getUser(user.uid).on('value',function (snapshot) {
          console.log("Profile changed")
          console.log(snapshot.val());

        })
      }



    });
*/

  }


  onPromoSlideChanged(){

  }

  toggle(){

    this.menuCtrl.toggle();
  }

  salons(){


    this.navCtrl.push(SalonsPage);
  }

  makeup(){
    this.navCtrl.push(MakeupPage);
  }

  photo(){
    this.navCtrl.push(PhotoPage);
  }


  store()
  {
    this.navCtrl.push(StorePage);
  }
}
