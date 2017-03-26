import { Component } from '@angular/core';
import { NavController , ViewController, NavParams, AlertController} from 'ionic-angular';
import {Cartservice} from  '../../providers/cartservice';
import {Authservice} from '../../providers/authservice';
import {StorehomePage} from '../storehome/storehome';

import {NewstorePage} from '../newstore/newstore';

/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers:[Cartservice,Authservice]

})
export class CheckoutPage {

  addresses:any[] = [] ;
  methods:any[] = [];

  promospinner:any =  false ;
  discount:any = 0 ;
  subtotal:any  ;
  total:any = 0 ;
  shippingaddress:any;
  deliveryMethod:any;
  promocode2:any = "";
  mycart:any[] = [];
  promocode:any ;




  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public  cartservice:Cartservice, public params:NavParams, public  alertCtrl:AlertController, public auth:Authservice) {

    var democart = this.params.get("cart");
   //console.log(democart);

var userid = this.auth.getAuth().uid;

console.log(userid);

    this.auth.getAddress(userid).subscribe((res) => {

     for(var i = 0 ; i < res.length; i++){

       this.addresses.push({
         address:res[i]["address"],
         selected:res[i]["selected"]
       })

     }
    })

    this.subtotal = params.get("total");
    this.total = this.subtotal ;









    this.methods.push({method:"Instant Delivery",selected:true});
    this.methods.push({method:"Normal Delivery",selected:false});

    this.shippingaddress = this.addresses[0];
    this.deliveryMethod =  this.methods[0];


  }






  ionViewDidLoad() {
    console.log('Hello CheckoutPage Page');
  }

  close(){
    this.viewCtrl.dismiss();

  }


  validatePromo(code:any){
    if(typeof code == 'undefined' || code == ""){

    }
    else {
      this.promospinner = true ;

      this.cartservice.getPromo(code).subscribe((val)=> {

        console.log(val);
        this.promospinner = false ;

        if(val.length > 0) {
          console.log(parseInt(val[0].discount))

         // this.promocode2 = parseInt(val[0]);
          this.discount = ((parseInt(this.total) * parseInt(val[0].discount)) )/ 100

          this.total =  parseInt(this.total) - parseInt(this.discount);

          let alert = this.alertCtrl.create({
            title: 'Congratulations',
            subTitle: 'You have got a discount of Rs' + this.discount + ' by using this Promo Code',
            buttons: ['Dismiss']
          });
          alert.present();

        }
        else {

          this.discount = 0 ;
          this.total = this.params.get("total");
          this.promocode2 = "";

          let alert = this.alertCtrl.create({
            title: 'Invalid Promocode',
            subTitle: 'Please Enter a Valid Promo Code',
            buttons: ['Dismiss']
          });
          alert.present();




        }

      });

    }


  }

  selectAddress(item:any){
console.log("Selected Address");
    var index = this.addresses.indexOf(item);
    this.addresses[index].selected = true ;
    this.shippingaddress = this.addresses[index];

    for (var i = 0 ; i < this.addresses.length;i++){


      if(i != index) {
        this.addresses[i].selected = false ;
      }


    }

  }

  selectMethod(item:any){

    var index = this.methods.indexOf(item);
    this.methods[index].selected = true ;
    this.deliveryMethod =  this.methods[index];

    for (var i = 0 ; i < this.methods.length;i++){


      if(i != index) {
        this.methods[i].selected = false ;
      }


    }

  }


  order(){



    //add cart
    var democart = this.params.get("cart");

    for(var i = 0; i < democart.length;i++){

     delete democart[i].$key;
      delete democart[i].$exists;
      console.log(democart[i])

    }


this.mycart = democart;


    var shippingdetails = {

      shippingAddress: this.shippingaddress,
      deliveryMethod:this.deliveryMethod,

    }

    var orderNo = Math.floor(Math.random()*90000) + 10000;
    var orderdetails = {
      total: this.total ,
      subtotal:this.subtotal,
      discount:this.discount,
      Promo:this.promocode2

    }

    var todayTime = new Date();
    var month = todayTime .getMonth() + 1;
    var day = todayTime .getDate();
    var year = todayTime .getFullYear();
    var d = month + "/" + day + "/" + year;
    var mytime = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();


    var order = {
      orderDate:d,
      orderTime:mytime,
      userid:this.params.get("userid"),
      orderNo:orderNo ,
      cart:this.mycart,
      orderDetails:orderdetails,
      statusCode:0,
      statusMessage:"Not Delivered",
      shippingDetails:shippingdetails


    }

    this.cartservice.addOrder(order).then((val)=>{

      let alert = this.alertCtrl.create({
        title: 'Order Success',
        subTitle: 'Order has been placed succesfully',
        buttons: [{
          text:'cancel',
          handler: ()=>{

            this.cartservice.clearCart(this.params.get("userid"));

            this.viewCtrl.dismiss();
            //this.navCtrl.setRoot(NewstorePage);
            //this.navCtrl.pop();


          }

        }]
      });
      alert.present();





    })


  }

}
