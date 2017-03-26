import { Injectable } from '@angular/core';
import { LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {


  public fireAuth:any;
  public userPforile :any

  constructor(public http: Http, public loadingCtrl:LoadingController,public alertCtrl: AlertController) {

    this.fireAuth = firebase.auth();
    this.userPforile = firebase.database().ref('users');

  }

  getUser(userid:string){

    return firebase.database().ref('/users/' + userid);
  }


public search:string;

  getsearch(){
    return this.search;
  }

  setSearch(search:string){
    this.search =  search;
  }

getAuth(){
  return this.fireAuth;
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

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  addNewProfile(uid:string,email:string,name:string,phone:string){
  return  this.userPforile.child(uid).set({
      email:email,
      name:name,
      phone:phone,
    verified:false
    });

  }


  login(email:string, password:string){
    return this.fireAuth.signInWithEmailAndPassword(email,password);

  }


  verifyProfile(userid:string){

    return this.userPforile.child(userid).update({verified:true});
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


  createUser(email:string,password:string){
     return this.fireAuth.createUserWithEmailAndPassword(email,password);
  }



  logout(){

    return this.fireAuth.signOut();
  }

}
