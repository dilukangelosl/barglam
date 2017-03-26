import { Component } from '@angular/core';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { NavController, MenuController , App, AlertController} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {Authservice} from '../../providers/authservice';



/*
  Generated class for the Storeaccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storeaccount',
  templateUrl: 'storeaccount.html',
  providers: [Authservice]
})
export class StoreaccountPage {

show:boolean = false ;
  public  profile:any ;user:any = {};
userId:any ;
primaryaddresskey:any ;

emailverified:any ;
emailloader:boolean = false ;

  public  address:FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public appCtrl:App, public menuCtrl:MenuController, public auth:Authservice, public alertCtrl:AlertController) {

    this.emailverified = this.auth.isVerified();


    this.userId = this.auth.getAuth().uid;

this.auth.getPrimaryAddress(this.userId).subscribe((res)=> {

  this.primaryaddresskey = res.primary ;
})

    this.auth.getProfile(this.userId).subscribe((val) => {


this.profile = val[0];

this.show = true ;
console.log(this.profile);


    })

    this.address =   this.auth.getAddress(this.userId);



  }

  setDefault(item:any){









    this.auth.setDefaultAddress(this.userId, null, item.$key).then((val)=>{

      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Primary Address Changed',
        buttons: ['Dismiss']
      });
      alert.present();

    })

  }


  sendemail(){
    this.emailloader = true ;

    this.auth.sendVerification().then((res) => {

      this.emailloader = false;
    }).catch((err) => {

      this.emailloader = false ;
    })
  }


  addAddress(){
console.log("hello prompt");
    this.presentPrompt();
  }


  remove(item:any){

    this.auth.deleteAddress(this.userId, item.$key).then((val) => {

      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Successfully Removed Address',
        buttons: ['Dismiss']
      });
      alert.present();

    })
  }


  saveProfile(){


    var data = {
      name:this.profile.name,
      phone:this.profile.phone,
      email:this.profile.email


    };

   this.auth.saveProfile(this.userId,data,this.profile.$key);

    let alert = this.alertCtrl.create({
      title: 'Profile Saved',
      subTitle: 'Profile Saved Successfully',
      buttons: ['Okay']
    });
    alert.present();


  }


  edit(item:any){

    let alert = this.alertCtrl.create({
      title: 'Edit Address',
      inputs: [
        {
          name: 'Address',
          placeholder: 'Edit Address',
          value:item.address
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save Address',
          handler: data => {



            var data2 = {
              address: data.Address
            }

            var key  = item.$key ;
            this.auth.editAddress(this.userId, data2, key).then((val)=> {

              console.log("Edited");
            })
          }
        }
      ]
    });





    alert.present();

  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Add Address',
      inputs: [
        {
          name: 'Address',
          placeholder: 'Enter Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add Address',
          handler: data => {
              this.auth.addAddress(this.userId, data.Address).then((val)=> {

                console.log("added");
              })
          }
        }
      ]
    });


    alert.present();
  }


  ionViewDidLoad() {
    console.log('Hello StoreaccountPage Page');
  }

  toggle(){

    this.menuCtrl.toggle();
  }

  gotocart(){

    //this.navCtrl.push(CartPage);
    this.appCtrl.getRootNav().push(CartPage);
  }


}
