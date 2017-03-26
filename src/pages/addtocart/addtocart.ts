import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {Authservice} from '../../providers/authservice';
import {Cartservice} from '../../providers/cartservice';
import { Toast  } from 'ionic-native';

import { FirebaseListObservable } from 'angularfire2';
import {isUndefined} from "ionic-angular/umd/util/util";

/*
  Generated class for the Addtocart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addtocart',
  templateUrl: 'addtocart.html',
  providers:[Authservice,Cartservice]
})
export class AddtocartPage {


  product:any ;
  user:any;
  storeid:any ;
  color:any;
  size:any;
  qty:any = 0;
  public  cart:FirebaseListObservable<any[]> ;
  constructor(public navCtrl: NavController, public params:NavParams, public auth : Authservice, public cartservice:Cartservice,public viewCtrl: ViewController) {

    this.product = params.get("product");

    this.storeid = params.get("storeid");
    this.user = this.auth.getAuth();
    this.cart = this.cartservice.getCart(this.user.uid);


  }

  ionViewDidLoad() {
    console.log('Hello AddtocartPage Page');
  }

  closethis(){
    this.viewCtrl.dismiss();
  }

  addtocard(pro:any) {





    this.cart.push({
      id:pro.$key,
      name:pro.name,
      price:parseInt(pro.sellingprice) *parseInt( this.qty),
      image:pro.image,
      color:this.color ,
      size:this.size,

      storeid: this.storeid
    }).then((res)=> {
      console.log("Added to cart");
      this.viewCtrl.dismiss();

      Toast.show("Added to Cart", '3000', 'center');


    })

  }


  gocart (){

    this.navCtrl.push(CartPage);
  }

}
