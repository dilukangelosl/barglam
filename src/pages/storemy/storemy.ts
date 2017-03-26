import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Storemy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storemy',
  templateUrl: 'storemy.html'
})
export class StoremyPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello StoremyPage Page');
  }

}
