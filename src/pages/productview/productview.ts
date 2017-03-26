import { Component } from '@angular/core';
import { NavController , NavParams, ModalController} from 'ionic-angular';
import {Cartservice} from '../../providers/cartservice';
import {Authservice} from  '../../providers/authservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import  {CartPage} from '../cart/cart';
import { Toast  } from 'ionic-native';
import {AddtocartPage} from '../addtocart/addtocart';


/*
  Generated class for the Productview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-productview',
  templateUrl: 'productview.html',
  providers:[Cartservice,Authservice]
})
export class ProductviewPage {


  product:any;
storeid:any ;
  user:any;

 public  cart:FirebaseListObservable<any[]> ;


  constructor(public navCtrl: NavController, public params:NavParams, public cartservice:Cartservice, public auth : Authservice,public modalCtrl: ModalController) {

    this.product =  params.get("product");
    this.storeid = params.get("storeid");
    this.user = this.auth.getAuth();
    this.cart = this.cartservice.getCart(this.user.uid);

  }

  ionViewDidLoad() {
    console.log('Hello ProductviewPage Page');
  }





  gocart(){
    this.navCtrl.push(CartPage);
  }

  addtocard(pro:any) {


   this.cart.push({
     id:pro.$key,
     name:pro.name,
     price:pro.sellingprice,
     image:pro.image,
     storeid: this.storeid
   }).then((res)=> {
     console.log("Added to cart");

     Toast.show("Added to Cart", '3000', 'center');


   })

  }

  viewcart (){

    this.navCtrl.push(CartPage);
  }




  showaddtocart(product:any){
    let modal = this.modalCtrl.create(AddtocartPage, {product:product, storeid:this.storeid});
    modal.present();
  }

}
