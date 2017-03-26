import { Component } from '@angular/core';
import { NavController , MenuController, ModalController} from 'ionic-angular';
import {StorehomePage} from '../storehome/storehome';
import {CartPage} from '../cart/cart';
import {MyordersPage} from '../myorders/myorders';
import {ProductsearchPage} from  '../productsearch/productsearch';
import {StoresettingsPage} from '../storesettings/storesettings';
import {StoreaccountPage} from '../storeaccount/storeaccount';

/*
  Generated class for the Newstore page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newstore',
  templateUrl: 'newstore.html'
})
export class NewstorePage {

  home =StorehomePage;
  order=MyordersPage;
  search =ProductsearchPage ;
  homeOptions:any;
  promos:any;
  settings = StoresettingsPage;
  account = StoreaccountPage;


  gotocart(){

    //this.navCtrl.push(CartPage);

    let profileModal = this.modalCtrl.create(CartPage);
    profileModal.present();

  }

  constructor(public navCtrl: NavController, public  menuCtrl:MenuController, public modalCtrl:ModalController) {


    this.homeOptions = {
      initialSlide: 0,
      loop: true,
      autoplay:2000,
      autoplayDisableOnInteraction: false
    };

    this.promos = [
      {
        image:"http://placehold.it/400x150"
      },
      {
        image:"http://placehold.it/400x150"
      },
      {
        image:"http://placehold.it/400x150"
      },
      {
        image:"http://placehold.it/400x150"
      },
      {
        image:"http://placehold.it/400x150"
      }]


  }

  ionViewDidLoad() {
    console.log('Hello NewstorePage Page');
  }


  toggle(){

    this.menuCtrl.toggle();
  }

}
