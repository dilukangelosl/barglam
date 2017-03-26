import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {


public type:any;
  public types:any;
  public salonservices:any ;
  public makeupservices:any;
  public photographerservices : any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController) {

    this.salonservices = ['Haircut', 'Shave','Head Massage'];
    this.types = ["Salons","Makeup Artists","Photographers"];
    this.type = this.types[0];






  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }
  typeChange(ev:any, item:any) {
    console.log(item);
  }

  dismiss() {
    let data = { 'search': this.type };
    this.viewCtrl.dismiss(data);
  }



}
