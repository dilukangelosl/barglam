import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Storecategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storecategories',
  templateUrl: 'storecategories.html'
})
export class StorecategoriesPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello StorecategoriesPage Page');
  }

}
