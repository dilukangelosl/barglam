import { Component } from '@angular/core';
import { NavController , NavParams ,ViewController} from 'ionic-angular';
import  {Authservice} from '../../providers/authservice';
import {Makeupservice} from '../../providers/makeupservice';
/*
  Generated class for the Select page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select',
  templateUrl: 'select.html',
  providers:[Authservice, Makeupservice]
})
export class SelectPage {


  /*
  =============== Category Codes ==============
  1) bridal
  2) specialocassion
  3) specialfx
  4) commercialandtv




   */


  specialocassion:any[] = [];
  bridal:any[] = [];
  specialfx:any[] = [];
  commercialandtv:any[] = [];
  typeid:any ;
  selected:any[] = [] ;


  constructor(public navCtrl: NavController, public makeupservice:Makeupservice, public params:NavParams,public viewCtrl: ViewController) {

    this.typeid = this.params.get("id");

    console.log(this.selected);





    this.makeupservice.getService(this.typeid,'specialoccasions').subscribe((res) => {

      res.forEach((item)=> {


        item["cat"] = 2 ;
        this.specialocassion.push(item);

      })


    })



    this.makeupservice.getService(this.typeid,'bridal').subscribe((res) => {

      res.forEach((item)=> {


        item["cat"] = 1;
        this.bridal.push(item);

      })


    })


    this.makeupservice.getService(this.typeid,'specialfx').subscribe((res) => {

      res.forEach((item)=> {

        item["cat"] = 3 ;
        this.specialfx.push(item);

      })


    })



    this.makeupservice.getService(this.typeid,'commercialandtv').subscribe((res) => {

      res.forEach((item)=> {

        item["cat"] = 4 ;
        this.commercialandtv.push(item);

      })


    })

    if(this.params.get("selected").length > 0) {
      //loop and set all ticks
      console.log("Not Empty array");
      this.selected = this.params.get("selected");
      for (var i = 0 ;  i < this.selected.length ; i++){




        //loop selected

        //check for catergory

        if(this.selected[i]["cat"] == 1){
          //loop bridal



          for(var b = 0 ; b < this.bridal.length; b++){

            if(this.selected[i].$key == this.bridal[b].$key){

              this.bridal[b]["show"] = true ;
            }

          }

        }

        else  if (this.selected[i]["cat"] == 2){
          //specialocassion
          for(var c = 0 ; c < this.specialocassion.length; c++){

            if(this.selected[i].$key == this.specialocassion[c].$key){

              this.specialocassion[c]["show"] = true ;
            }

          }

        }

        else  if (this.selected[i]["cat"] == 3){

          //specialfx
          for(var d = 0 ; d < this.specialfx.length; d++){

            if(this.selected[i].$key == this.specialfx[d].$key){

              this.specialfx[d]["show"] = true ;
            }

          }


        }

        else  if (this.selected[i]["cat"] == 4){
          //commercialandtv

          for(var e = 0 ; e < this.commercialandtv.length; e++){

            if(this.selected[i].$key == this.commercialandtv[e].$key){

              this.commercialandtv[e]["show"] = true ;
            }

          }
        }


      }




      //
    }

    else {


      console.log("Empty array");
      //set empty array
      this.selected = [];
    }




  }







  toggle(item:any) {

    if(item["show"] != null){

      item["show"] =  !item["show"];

      if(item["show"]) {
        this.selected.push(item);
      }else {

        this.selected.splice(this.selected.indexOf(item),1);
      }



    }else {


      this.selected.push(item);

      item["show"] = true ;

    }

  }

  close(){


    let data = {
      selected: this.selected

    }

    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('Hello SelectPage Page');
  }



  select(){


    let data = {
      selected: this.selected

    }

    this.viewCtrl.dismiss(data);
  }
}
