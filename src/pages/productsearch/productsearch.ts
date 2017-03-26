import { Component } from '@angular/core';
import {NavController, MenuController, App} from 'ionic-angular';
import {CartPage} from '../cart/cart';
import {Authservice} from '../../providers/authservice';
import {Cartservice} from '../../providers/cartservice';
import { FormControl } from '@angular/forms';
import {CategoryproductPage} from '../categoryproduct/categoryproduct';
import {Storeservice} from '../../providers/storeservice';



/*
  Generated class for the Productsearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-productsearch',
  templateUrl: 'productsearch.html',
  providers: [Authservice,Cartservice,Storeservice]
})
export class ProductsearchPage {

products2:any =[] ;
  products:any = [];
  myInput:any = "";
  searchControl: FormControl;
  searching: any = true;

  constructor(public navCtrl: NavController, public  menuCtrl:MenuController, public appCtrl:App, public storeservice:Storeservice) {

    this.searchControl = new FormControl();


   this.storeservice.getProducts().subscribe((res) => {
    this.products2 = res;
    this.products = res ;
     this.searching = false;
   })



  }


  filterProducts(search:any){
    return this.products2.filter((item) => {
     // return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      return item.name.toLowerCase().includes(search.toLowerCase()) == true;
    });
  }


  gotoProduct(product:any) {
    this.navCtrl.push(CategoryproductPage, {product:product});

  }

  onInput() {
      //get from api


  }

  onCancel(cancel){


  }

  ionViewDidLoad() {
    console.log('Hello ProductsearchPage Page');


    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {


     this.products = this.filterProducts(search);

     //call api method
      console.log(search)
      this.searching = false;


    });


  }

  onSearchInput(){
    this.searching = true;
  }


  toggle(){

    this.menuCtrl.toggle();
  }

  gotocart(){

    //this.navCtrl.push(CartPage);
    this.appCtrl.getRootNav().push(CartPage);
  }

}
