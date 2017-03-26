import { Component } from '@angular/core';
import { NavController , NavParams,AlertController, ViewController } from 'ionic-angular';
import {Cartservice} from '../../providers/cartservice';
import {Authservice} from '../../providers/authservice';



/*
  Generated class for the Myordersview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myordersview',
  templateUrl: 'myordersview.html',
  providers: [Cartservice,Authservice]
})
export class MyordersviewPage {



  order:any ;
  userid:any ;
  constructor(public navCtrl: NavController, public params:NavParams, public myservice:Cartservice, public alertCtrl:AlertController, public  auth:Authservice, public viewCtrl:ViewController) {

    this.order = params.get("order");
  //  this.userid = params.get("userid");
  //  console.log(this.order);



  }


  close(){

    this.viewCtrl.dismiss();
  }

  cancelorder(order:any){




    let confirm = this.alertCtrl.create({
      title: 'Order Cancellation',
      message: 'Do you want to Cancel your Order ?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {

            this.myservice.cancelorder(order, this.userid);
            this.navCtrl.pop();

          }
        }
      ]
    });
    confirm.present();












  }

  ionViewDidLoad() {
    console.log('Hello MyordersviewPage Page');
  }

}
