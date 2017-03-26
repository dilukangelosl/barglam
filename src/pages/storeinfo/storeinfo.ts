import { Component } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
import { Storeservice } from '../../providers/storeservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import  {ProductviewPage} from '../productview/productview';


/*
  Generated class for the Storeinfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-storeinfo',
  templateUrl: 'storeinfo.html',
  providers:[Storeservice]


})
export class StoreinfoPage {

  public store:any ;
  public products:FirebaseListObservable<any[]>;
  public storesegment :any = "about";

  constructor(public navCtrl: NavController, public params:NavParams, public storeservice:Storeservice) {


   this.store = params.get('store');
  //console.log(this.store);

    console.log(this.store.$key);
  //  this.products =  this.storeservice.getProducts(this.store.$key);


  }


  productview(product:any){

    this.navCtrl.push(ProductviewPage, {product:product, storeid:this.store.$key});
  }


  ionViewDidLoad() {
    console.log('Hello StoreinfoPage Page');
  }

}
