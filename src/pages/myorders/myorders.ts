import { Component } from '@angular/core';
import { NavController ,ModalController, MenuController, App} from 'ionic-angular';
import {Cartservice} from '../../providers/cartservice';
import {Authservice} from '../../providers/authservice';
import  {MyordersviewPage} from '../myordersview/myordersview';
import {Reverse} from '../../pipes/reverse';
import {CartPage} from '../cart/cart';


/*
  Generated class for the Myorders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',

  providers:[Cartservice,Authservice]

})
export class MyordersPage {

  bk:any = 'pending';
  orders:any[] = [] ;
userid:any;
  constructor(public navCtrl: NavController, public myservice:Cartservice, public auth :Authservice, public modalCtrl:ModalController, public menuCtrl:MenuController, public appCtrl:App) {


  this.userid = this.auth.getAuth().uid ;
    this.doRefresh(null);


  }


  viewOrder(order:any){
    let profileModal = this.modalCtrl.create(MyordersviewPage, { order: order });
    profileModal.present();
  }

  sort(){
    for(var i = 0 ; i < this.orders.length;i++){

      var pending = [];
      var other = [];

      if(this.orders[i].statusCode == 0){
        console.log("penging");
        pending.push(this.orders[i]);
      }else {
        console.log("not pending");
        other.push(this.orders[i]);
      }


    }


    this.orders = [];
    this.orders.push.apply(pending);
    this.orders.push.apply(other);

  }


  toggle(){

    this.menuCtrl.toggle();
  }

  gotocart(){

    //this.navCtrl.push(CartPage);
    //this.appCtrl.getRootNav().push(CartPage);

    let profileModal = this.modalCtrl.create(CartPage);
    profileModal.present();
  }

  doRefresh(refresher) {






    this.orders = [];


    this.myservice.getmyorders(this.userid).subscribe((val)=> {
      this.orders = [];
      val.forEach((item)=>{
console.log(item);
        this.orders.push(item);
      })


if(refresher != null){
  refresher.complete();
}


    })

  }


  gotoorder(order:any) {

    this.navCtrl.push(MyordersviewPage, {order:order, userid:  this.auth.getAuth().uid});
  }


  ionViewDidLoad() {
    console.log('Hello MyordersPage Page');
  }

}
