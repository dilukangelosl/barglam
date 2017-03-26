import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { LoadingController,AlertController } from 'ionic-angular';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

import * as firebase from 'firebase';
/*
  Generated class for the Authservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Authservice {

  Profiles: FirebaseListObservable<any[]>;
  Profile: FirebaseObjectObservable<any>;
  fireAuth: any;
  userdetails:any;

  constructor(public http: Http,public af: AngularFire, public alertCtrl:AlertController, public loadingCtrl : LoadingController,public push: Push) {



    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;




      }
    });





  }


  isVerified(){

    return this.fireAuth["emailVerified"];
  }


  forgotPassword(email:any){

    var auth = firebase.auth();
    var emailAddress = email;

   return  auth.sendPasswordResetEmail(emailAddress);
  }


  setDefaultAddress(userid:any,oldkey:any, newkey:any){



  return  this.af.database.object('/profiles/'+userid+'/address/').update({primary:newkey});
  }

  addAddress(userid:any, address:any){

    var data = {
      address:address,
      selected:false
    };
    return this.af.database.list('/profiles/'+userid+'/address/address').push(data);

  }

  getProfile(userid:any){
    return this.af.database.list('/profiles/'+userid);
  }

  getAddress(userid:any){
    return this.af.database.list('/profiles/'+userid+'/address/address');

  }


  getaddressPromise(userid:any){
    return new Promise((resolve,reject)=>{
      this.af.database.list('/profiles/'+userid+'/address/address').subscribe((res)=>{

        res.forEach((item)=>{
          resolve(item["name"]);

        })
      })

    })

  }


  editAddress(userid:any,item:any, key:any){
console.log(item);
    return this.af.database.object('/profiles/'+userid+'/address/address/'+key).update(item);

  }

  updatetoken(token:any){
    console.log("Upading push token " + token);
    return this.af.database.object('/profiles/'+this.fireAuth.uid +'/token').update({token:token});

  }

  addToken(token:any){
    console.log("adding push token " + token);
    return this.af.database.object('/profiles/'+this.fireAuth.uid +'/token').set(token);
  }




  deleteAddress(userid:any, key:any){

    return this.af.database.object('/profiles/'+userid+'/address/address/'+key).remove();

  }

  getPrimaryAddress(userid:any){

    return this.af.database.object('/profiles/'+userid+'/address/');
  }

  getBookingPromos(){
    return this.af.database.list('/admin/bookingpromos');
  }

  getStoreOffers(){
    return this.af.database.list('/admin/storeoffers');
  }




  saveProfile(userid:any, profile:any, key:any){
    return this.af.database.object('/profiles/'+userid+'/'+key).update(profile);

  }

  verifyProfile(nodeid:any,userid:string){
    this.Profile = this.af.database.object('/profiles/'+userid+'/'+nodeid);
    console.log('/profiles/'+userid+'/'+nodeid);
   return this.Profile.update({verified:true});

  }


  getAuth(){
    return this.fireAuth;
  }


  getUser(){


   return new Promise((resolve,reject)=>{
     this.af.database.list('/profiles/'+this.fireAuth.uid).subscribe((res)=>{

       res.forEach((item)=>{
         resolve(item["name"]);

       })
     })

   })



  }



  getuser2(){
    return new Promise((resolve,reject)=>{
      this.af.database.list('/profiles/'+this.fireAuth.uid).subscribe((res)=>{

        res.forEach((item)=>{
          resolve(item);

        })
      })

    })
  }
  getProfilename(){


    return this.af.database.list('/profiles/'+this.fireAuth.uid);

  }

  sendText(name ,verificationCode,phonenumber) {

    var text = "Hi "+ name +" Welcome to glambar , Please enter this code to verify your Account " + verificationCode ;
    var url = "http://www.textit.biz/sendmsg?id=94772724535&pw=5276&to="+phonenumber+"&text="+text;


    return new Promise(resolve => {

      this.http.get(url).map(res => res.json()).subscribe(data => {

        console.log(data.results);
        resolve(data);
      })

    })
  }

  addNewProfile(uid:string,email:string,name:string,phone:string, token:any){


    this.Profiles = this.af.database.list('/profiles/'+uid);

    return this.Profiles.push({
      email:email,
      name:name,
      phone:phone,
  pushToken:token,
      verified:false

    })

  }



  loginUser(newEmail: string, newPassword: string): any {




    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }


  logoutUser(): any {
    return this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
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



  sendVerification(){
    return this.af.auth.getAuth().auth.sendEmailVerification();
  }
}
