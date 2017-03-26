import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { LoadingController,AlertController } from 'ionic-angular';
import {Authservice} from '../providers/authservice'
import { Toast } from 'ionic-native';


/*
  Generated class for the Cartservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Cartservice {


  orderref: FirebaseListObservable<any>;
  profile: FirebaseListObservable<any>
  cart: FirebaseListObservable<any>
  store: FirebaseListObservable<any>
orders: FirebaseListObservable<any>;
  mycart: FirebaseListObservable<any>;


  constructor(public http: Http, public af: AngularFire, public  auth: Authservice) {

    this.mycart = this.af.database.list('/profiles/' + auth.getAuth().uid + '/cart/');

    this.orders =  this.af.database.list('/store/orders');
  }


  //order party

  addOrder(order:any) {


    console.log("adding Order");

    console.log(order);

    return this.orders.push(order);

  }


  //


  cancelorder(order: any, userid: any) {

    var orderq = this.af.database.object('/store/orders/' + order.$key);

    orderq.update({statusCode: "2", statusMessage:"Cancelled by User"});

  }

  getmyorders(userid: any) {
    return this.af.database.list('store/orders/',{
      query: {

        orderByChild:'userid',
        equalTo:userid

      }
    });

  }


  clearCart(userid: any) {

    return this.af.database.list('/profiles/' + userid + '/cart/').remove();
  }

  getCart(userid: any) {
    console.log("getting cart of " + '/profiles/' + userid + '/cart/');
    return this.af.database.list('/profiles/' + userid + '/cart/');

  }

  remove(userid: any, key: any) {
    return this.af.database.object('/profiles/' + userid + '/cart/' + key).remove();
  }

  addToCart(userid: any, item: any) {

     Toast.show("Added to Cart", '3000', 'center').subscribe(
     toast => {
     console.log(toast);
     }
     );


    console.log('/profiles/' + userid + '/cart/');
    /*
     this.mycart.forEach((subitem)=>{

     if(item.name == subitem.name){

     if(item["qty"]){
     item["qty"]++;
     }else {

     item["qty"] = 0;
     }

     }

     })
     */

    item["qty"] = 1;
    return this.mycart.push(item);
  }


  deleteFromCart(userid: any, item: any) {

    // return this.af.database.object('/profiles/'+userid+'/cart/'+item.$key).remove(item);

  }






  getPromo(code:any) {
    return this.af.database.list('store/promocodes', {
      query: {

        orderByChild:'code',
        equalTo:code

      }

    })

  }

}
