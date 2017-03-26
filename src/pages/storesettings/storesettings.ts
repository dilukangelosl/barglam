import { Component } from '@angular/core';
import {NavController, MenuController, Menu, App} from 'ionic-angular';
import {CartPage} from '../cart/cart';

/*
  Generated class for the Storesettings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storesettings',
  templateUrl: 'storesettings.html'
})
export class StoresettingsPage {

  constructor(public navCtrl: NavController, public  menuCtrl:MenuController, public appCtrl:App) {}

  ionViewDidLoad() {
    console.log('Hello StoresettingsPage Page');
  }

  toggle(){

    this.menuCtrl.toggle();
  }

  gotocart(){

    //this.navCtrl.push(CartPage);
    this.appCtrl.getRootNav().push(CartPage);
  }


}
