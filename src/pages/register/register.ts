import { Component } from '@angular/core';
import { NavController, ViewController,LoadingController } from 'ionic-angular';
import { Authservice } from '../../providers/authservice';
import {Welcome2Page} from "../welcome2/welcome2";
import { Auth, User ,UserDetails, IDetailedError, Push, PushToken} from '@ionic/cloud-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[Authservice]
})
export class RegisterPage {

masks:any;
  veri:boolean ;
  public userEmail:any ;
  public userfullname:any;
  public userPhone:any;
  public userPassword: any;
  public verificationcode :any
  public usercode:any;
  public userid:any ;
  public nodeid:any;
  public token:any = "123";


  constructor(public navCtrl: NavController, public viewctrl:ViewController, public auth:Authservice,public loadingCtrl: LoadingController ,public ionicAuth: Auth, public user: User,public push: Push) {
    this.veri = false ;

    this.masks = {
      userPhone: ['(', /[0-9]/, /\d/,  ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

    };


  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }


  presentLoadingDefault(text) {
    let loading = this.loadingCtrl.create({
      content: text
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);


    return loading ;
  }


  closeLoader(loader){

    loader.dismiss();
  }

  register(){

    var phone =  this.userPhone.replace(/\D+/g, '');




   var loader=  this.presentLoadingDefault("Please Wait");




    this.auth.signupUser(this.userEmail, this.userPassword).then((res) => {
     // console.log(res);
      this.userid = res.uid ;
     // console.log("Creating profile");


      //send email verification

    this.auth.sendVerification().then((res) => {
      console.log("Verification Sent");
      console.log(res);
    })




      //create ionic user

      let details: UserDetails = {'email': this.userEmail, 'password': this.userPassword};



        this.push.register().then((t: PushToken) => {

          return this.push.saveToken(t);
        }).then((t: PushToken) => {
         this.token = t.token;
         this.auth.addToken(t.token);

        });



      this.auth.addNewProfile(res.uid,this.userEmail, this.userfullname, phone, this.token).then((createdprofile) => {
       console.log("profile created");
        //send verification text
        console.log(createdprofile);
        this.nodeid = createdprofile.key;
       // this.veri = true;
       // this.verificationcode = Math.floor(Math.random() * 9999) + 1;
       // console.log("your verfication code is " + this.verificationcode);
       // this.auth.sendText(this.userfullname,this.verificationcode,this.userPhone);

       // this.navCtrl.setRoot(Welcome2Page);

        this.close(1);

        this.closeLoader(loader);
      })




    }).catch((err) => {
      loader.dismiss();
      //error creating the user
      this.auth.presentAlert("Registration Failed", err.message);

    })




  }

  verify()
  {

    if(this.verificationcode == this.usercode)
    {
      console.log("Verifying user ..." + this.userid);

     this.auth.verifyProfile(this.nodeid,this.userid).then((res)=>{
       console.log(res);
       this.navCtrl.setRoot(Welcome2Page);
     });
    }
    else {

      this.auth.presentAlert("Failed Verification", "The code you entered is Invalid");
    }

  }

  close(data:any){
  this.viewctrl.dismiss({data:data});

  }
}
