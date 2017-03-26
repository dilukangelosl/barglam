import { Component ,ViewChild} from '@angular/core';
import { NavController , App, MenuController} from 'ionic-angular';
import {CategoryPage} from '../category/category';
import {CartPage} from '../cart/cart';

/*
  Generated class for the Storehome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storehome',
  templateUrl: 'storehome.html'
})
export class StorehomePage {


  @ViewChild('myNav') nav: NavController
  greeting: string;
  testSlides: string[] = [];
  @ViewChild('mySlider') mySlider: any;
  _options:any;

  homeOptions:any;

  promos:any;



  constructor(public navCtrl: NavController, public appCtrl: App, public menuCtrl:MenuController) {


    this.homeOptions = {
      initialSlide: 0,
      loop: true,
      autoplay:4000,
      autoplayDisableOnInteraction: false
    };

    this.promos = [
      {
        image:"./assets/img/npromo.jpg"
      },
      {
        image:"./assets/img/npromo2.jpg"
      },
      {
        image:"./assets/img/npromo3.jpg"
      }]


    /*
     nextButton: ".swiper-button-next",
     prevButton: ".swiper-button-prev",

     */
    this._options = {
      slidesPerView:3,
      pager: false,

      onInit:()=>{
      }
    }
    setTimeout(()=>{
      for (var i=1; i<6; i++) {
        this.testSlides.push("Slide - "+i);
      }
    },100);

  }


  toggle(){

    this.menuCtrl.toggle();
  }

  gotocart(){

    //this.navCtrl.push(CartPage);
    this.appCtrl.getRootNav().push(CartPage);
  }


    gotoCat(id:any,name:any){

    let data = {
      id:id,
      name:name
    }

    //let nav = this.app.getComponent('nav');


this.navCtrl.push(CategoryPage, data);
   // this.appCtrl.getRootNav().push(CategoryPage, data);

  }

  ionViewDidLoad() {
    console.log('Hello StorehomePage Page');
  }

}
