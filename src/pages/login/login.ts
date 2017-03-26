import { Component } from '@angular/core';
import { NavController ,  ModalController } from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Authservice } from '../../providers/authservice';
import {Welcome2Page} from '../welcome2/welcome2';
import { Auth, User } from '@ionic/cloud-angular';
import {ResetpasswordPage} from '../resetpassword/resetpassword';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers :[Authservice]
})
export class LoginPage {

  public userEmail:any ;
  public userPassword:any ;

public haveNetwork:boolean = true ;

  constructor(public navCtrl: NavController, public modal :ModalController, public auth:Authservice, public ionicAuth:Auth, public push:Push, public ionicuser:User) {
    this.userEmail = "";
    this.userPassword = "";




  }



  ionViewDidLoad() {
    //console.log('Hello LoginPage Page');
  }

  login(){


      var loader = this.auth.presentLoadingDefault("Loggin in....");

      this.auth.loginUser(this.userEmail,this.userPassword).then((res)=> {
        loader.dismiss();






        this.push.register().then((t: PushToken) => {
          console.log("saving push in ionic user new new new");


          this.auth.updatetoken(t).then((val) => {



          })

          this.navCtrl.setRoot(Welcome2Page , {name:res});

        })




      }).catch((err)=>{
        loader.dismiss();
        this.auth.presentAlert("Login Failed" , err.message);
      })



  }
/*
  login(){
   var loader = this.myservice.presentLoadingDefault("Loggin in....");
    this.myservice.login(this.userEmail,this.userPassword).then((res)=> {
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);

    }).catch((err)=>{
      loader.dismiss();
      this.myservice.presentAlert("Login Failed" , err.message);

    })

  }

*/




  register(){
    let registermodal =  this.modal.create(RegisterPage);
    registermodal.present();

    registermodal.onDidDismiss((res) => {

      if(res["data"] == 1 ) {
        this.navCtrl.setRoot(Welcome2Page);

      }


    })
  }


  openforgotpassword(){

    let forgot =  this.modal.create(ResetpasswordPage);
    forgot.present();

    forgot.onDidDismiss((res) => {


    })

  }

}
