import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Authservice } from '../../providers/authservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Photoservice} from '../../providers/photoservice';
import {PhotoinfoPage} from '../photoinfo/photoinfo';
import { FormControl } from '@angular/forms';
/*
  Generated class for the Photo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  providers: [Authservice ,Photoservice]
})
export class PhotoPage {
  rates: any;
  public makeups:any = [];

  showsearch = false ;
  myInput:any = "";
  searchControl: FormControl;
  searching: any = false;

  toggleSearch(){

    this.showsearch = !this.showsearch;
  }

  constructor(public navCtrl: NavController, public makeupservice: Photoservice, public auth: Authservice, public loadingCtrl: LoadingController) {
    this.searchControl = new FormControl();
    this.rates = 5.5;


    this.makeupservice.getMakeup().subscribe((res) => {

      console.log(res);
      res.forEach((item) => {

        this.makeups.push(item);
      })
    })
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }


  gotomakeup(makeup:any){

    this.navCtrl.push(PhotoinfoPage,{makeup:makeup});
  }





  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {


      this.filterProducts(search);

      //call api method
      console.log(search)
      this.searching = false;


    });
  }


  filterProducts(search:any){
    return this.makeups.filter((item) => {
      // return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      return item["name"].toLowerCase().includes(search) == true;
    });
  }


  onSearchInput(){
    this.searching = true;
  }
}
