import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import {Authservice} from '../../providers/authservice'

/*
  Generated class for the Resetpassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
  providers: [Authservice]
})
export class ResetpasswordPage {


  email:any ;
  loader:boolean = false ;
  message:boolean = false;

  public m:any = "";


  constructor(public navCtrl: NavController, public viewCtrl:ViewController,public auth:Authservice) {


  }

  ionViewDidLoad() {
    console.log('Hello ResetpasswordPage Page');
  }

  close(){
    this.viewCtrl.dismiss();
  }


  setMessage(message:any){
    this.m ="";
    this.m = message;

  }




  resetpass(email:any) {
    console.log(email);
    this.loader = true ;
    let _self = this;
    _self.message = false ;


    if(typeof email == "undefined") {
      _self.m = "Please Enter an Email Address -_-";
      _self.loader = false ;
      _self.message = true ;

    }
    else {

      this.auth.forgotPassword(email).then(function (res) {

        _self.m = "Email has been sent to " + email + ", please retry in few minutes or report to support@glambar.lk if you didnt recieve an Email";
        _self.loader = false ;
        _self.message = true ;



      }, function (error) {
        console.log(error);
        _self.m = "Reset link cannot be sent to '"+email+"' Please check the Email address or report to support@glambar.lk";
        _self.loader = false ;
        _self.message = true ;
      })
    }




  }


}
