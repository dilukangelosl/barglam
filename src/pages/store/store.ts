import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {Storeservice} from '../../providers/storeservice'
import {StoreinfoPage} from  '../storeinfo/storeinfo';
import { Authservice } from '../../providers/authservice';
import {Cartservice} from '../../providers/cartservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {CartPage} from '../cart/cart';
/*
  Generated class for the Store page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
  providers: [Storeservice,Authservice, Cartservice]
})
export class StorePage {


  public cartnumber:any;

 public stores:FirebaseListObservable<any>;
  public loader:any = true  ;

  constructor(public navCtrl: NavController, public  myservice:Storeservice, public auth:Authservice, public loadingCtrl:LoadingController, public cartservice:Cartservice) {




   this.stores =  myservice.getStores();

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();




  }



  cart(){
    this.navCtrl.push(CartPage);
  }
  gotostore(store:any) {

    this.navCtrl.push(StoreinfoPage, {store:store});

  }

  ionViewDidLoad() {
    console.log('Hello StorePage Page');
  }

}
