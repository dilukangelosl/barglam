import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import {SearchPage} from '../search/search';
import {UserService} from '../../providers/user-service';

/*
  Generated class for the Salons page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-salons',
  templateUrl: 'salons.html',
  providers:[UserService]
})
export class SalonsPage {


  public searchtext:string;
  constructor(public navCtrl: NavController, public myservice:UserService,public modal: ModalController) {
      this.searchtext = this.myservice.getsearch();
  }

  ionViewDidLoad() {
    console.log('Hello SalonsPage Page');
  }

  search(){
   let searchmodal =  this.modal.create(SearchPage);

    searchmodal.onDidDismiss(data => {
      this.searchtext = data.search;
    });

   searchmodal.present();


  }

}
