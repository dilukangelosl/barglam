import { Component } from '@angular/core';
import { NavController, NavParams, App , ModalController} from 'ionic-angular';
import {CategoryproductPage} from '../categoryproduct/categoryproduct';
import {CartPage} from '../cart/cart';
import {Storeservice} from '../../providers/storeservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers:[Storeservice]
})
export class CategoryPage {

  name:any ;
  id:any;
  image:any;
  products:FirebaseListObservable<any[]>;
  loader:boolean = true;
  show(cat:any){

    console.log(cat);
  }

  gotocart(){

   // this.navCtrl.push(CartPage);
   // this.appCtrl.getRootNav().push(CartPage);
    let profileModal = this.modalCtrl.create(CartPage);
    profileModal.present();
  }
  constructor(public navCtrl: NavController, public params:NavParams, public appCtrl:App, public modalCtrl:ModalController, public storeService:Storeservice) {

    this.image  = "../assets/img/makeupbanner.jpg";

    this.name = this.params.get("name");
    this.id = this.params.get("id");
    console.log(this.name)

    this.products = this.storeService.getProducts();


    this.storeService.getProducts().subscribe((res) => {
      this.loader = false;
    })

  }



  gotoProduct(product:any) {
    this.navCtrl.push(CategoryproductPage, {product:product});

  }

  ionViewDidLoad() {
    console.log('Hello CategoryPage Page');
  }

}
