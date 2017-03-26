import { Component } from '@angular/core';
import { NavController , NavParams, MenuController,App, ModalController} from 'ionic-angular';
import {Cartservice} from '../../providers/cartservice';
import  {Authservice} from '../../providers/authservice';
import {CartPage} from '../cart/cart';
import  {FirebaseListObservable}   from 'angularfire2';
import {OptionselectPage} from '../optionselect/optionselect';

/*
  Generated class for the Categoryproduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-categoryproduct',
  templateUrl: 'categoryproduct.html',
  providers: [Cartservice, Authservice]
})
export class CategoryproductPage {

  userid :any;
  product:any;
  homeOptions:any;
  selectedoptions:any[] = [];
  baseprice :any = 0 ;
  optionprices:any[] = [];
  public cart2: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public params:NavParams, public  menuCtrl:MenuController , public cart:Cartservice, public auth:Authservice,public appCtrl: App, public modalCtrl:ModalController) {


    this.userid =  auth.getAuth().uid;

    this.cart2 = this.cart.getCart(this.userid);

    this.homeOptions = {
      initialSlide: 0,
      loop: true,
      autoplay:4000,
      autoplayDisableOnInteraction: false
    };

    this.product =  this.params.get("product");

    if(typeof this.product.options == "undefined"){

      this.product["options"] = [];
    }

this.baseprice = this.product.newprice ;
    //loop options

    console.log(this.product);

    for(var i = 0 ; i < this.product.options.length;i++){


console.log(this.product.options[i]);
     this.product.options[i]["selected"] =  this.product.options[i].options[0];
    }


    this.calculate();

  }





  openSelect(option:any, index:any){

    let profileModal = this.modalCtrl.create(OptionselectPage, { option: option, selected:this.selectedoptions, index:index });
    profileModal.present();


    profileModal.onDidDismiss((val) => {

      //get the selected value
    console.log(val)
      if(val.data != null){
        this.product.options[val.index]["selected"] = val.data;
        this.calculate();
      }


     // this.selectedoptions.push(val.data);
    })


  }


  addToCart(){

    var opt = [];
    for(var i = 0 ; i < this.selectedoptions.length; i++){

      var obj = {
        option:this.product.options[i].name,
        selection:this.product.options[i].options[this.selectedoptions[i]]
      }

      opt.push(obj);
    }


    this.product["selectedOptions"] = opt ;
    this.cart.addToCart(this.userid, this.product);


  }

  openCart (){



    //let profileModal = this.modalCtrl.create(CartPage);
  //  profileModal.present();

   // this.appCtrl.getRootNav().push(CartPage);
  // this.navCtrl.push(CartPage);

    let profileModal = this.modalCtrl.create(CartPage);
    profileModal.present();

    profileModal.onDidDismiss(data => {
      this.navCtrl.pop();
    })

  }
  ionViewDidLoad() {



  }

  show(cat:any){
    console.log(cat)
  }

  toggle(){

    this.menuCtrl.toggle();
  }



  calculate(){
    this.baseprice = this.product.newprice ;


    for(var i = 0 ;  i < this.product.options.length; i++){

      console.log("Adding " + parseInt(this.product.options[i].selected.addition) + "");
      this.baseprice += parseInt(this.product.options[i].selected.addition);

    }

  }


  choose(pos:any,options:any , index:any){
    this.baseprice = this.product.newprice ;
    var option = options[index];



    this.optionprices[pos] =  option.addition ;


    for(var i = 0 ; i < this.optionprices.length;i++){
      console.log(this.optionprices[i]);
      this.baseprice += this.optionprices[i];
    }

  }

}
