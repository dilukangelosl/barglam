import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Authservice } from '../../providers/authservice';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Makeupservice} from '../../providers/makeupservice';
import {MakeupinfoPage} from '../makeupinfo/makeupinfo';
import { FormControl } from '@angular/forms';

/*
  Generated class for the Makeup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-makeup',
  templateUrl: 'makeup.html',
  providers:[Makeupservice, Authservice]

})
export class MakeupPage {
  public makeups:any = [];

  showsearch = false ;
  myInput:any = "";
  searchControl: FormControl;
  searching: any = false;
  rates:any ;




  toggleSearch(){

    this.showsearch = !this.showsearch;
  }
  constructor(public navCtrl: NavController, public makeupservice:Makeupservice, public auth:Authservice, public loadingCtrl:LoadingController) {
    this.searchControl = new FormControl();
 this.rates = 5.5 ;


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



      if(typeof item["name"] == "undefined" )
      {
        console.log("found undefined");
        item["name"] = "";
        return false ;
      }
      else {
        return item.name.toLowerCase().includes(search.toLowerCase()) == true;
      }

      //var result = item["name"].toLowerCase().includes(search.toLowerCase()) ;

      //return result;




    });
  }


  onSearchInput(){
    this.searching = true;
  }

  gotomakeup(makeup:any){

    this.navCtrl.push(MakeupinfoPage,{makeup:makeup});
  }

}
