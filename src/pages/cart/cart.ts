import { Component } from '@angular/core';
import {NavController, ModalController, Modal, ViewController} from 'ionic-angular';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Cartservice} from '../../providers/cartservice'
import {Authservice} from  '../../providers/authservice';
import {CheckoutPage} from '../checkout/checkout';
import  {NewstorePage} from '../newstore/newstore';


/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [Authservice,Cartservice]
})
export class CartPage {


  public cart: FirebaseListObservable<any>;
  public total:any ;
  public sendingCart:any[] = [];


  constructor(public navCtrl: NavController, public myservice:Cartservice, public auth: Authservice, public modalCtrl :ModalController, public viewCtrl:ViewController) {

    var userid = this.auth.getAuth().uid ;
    this.cart =  this.myservice.getCart(userid);

    this.myservice.getCart(userid).subscribe((snaps)=> {
      this.sendingCart = [];
      this.total = 0 ;
      snaps.forEach((item)=> {

        this.sendingCart.push(item);
        this.total = parseInt(this.total) + parseInt(item.newprice);
      })

    })
  }



  increment(item:any){

    item.qty++;

    this.total = parseInt(this.total) + parseInt(item.newprice);
  }

  decrement(item:any){

    if(item.qty != 1) {
      item.qty--;

      this.total = parseInt(this.total) - parseInt(item.newprice);
    }
  }


  close(){
    this.viewCtrl.dismiss();
  }

requestOrder(cart:any){





  let modal = this.modalCtrl.create(CheckoutPage,{userid:this.auth.getAuth().uid, total:this.total,cart:this.sendingCart});

  modal.onDidDismiss(data => {
    this.close();
  })


  modal.present();






}


clearcart(){
  var userid = this.auth.getAuth().uid ;
  this.myservice.clearCart(userid);
  this.sendingCart = [];
  this.total = 0;
}

remove(item:any){
  var userid = this.auth.getAuth().uid ;
   this.myservice.remove(userid,item.$key);

//this.sendingCart.splice(this.sendingCart.indexOf(item),1);

}



  ionViewDidLoad() {
    console.log('Hello CartPage Page');
  }

}
