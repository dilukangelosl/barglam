import { Component } from '@angular/core';
import { NavController , NavParams, ViewController} from 'ionic-angular';

/*
  Generated class for the Optionselect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-optionselect',
  templateUrl: 'optionselect.html'
})
export class OptionselectPage {



index:any ;
  selectedOtion:any ;
  option:any;
  sentselected:any;

  constructor(public navCtrl: NavController , public params:NavParams, public viewCtrl:ViewController) {
    this.index = params.get("index");
    console.log("index ==" + this.index);
    this.option = params.get("option");
    console.log(this.option);
    this.sentselected =  params.get("selected");

    /*

    for(var i = 0 ;  i < this.option.options.length; i++){

      for(var e = 0 ;  e < this.sentselected ; e++){
        if(this.sentselected[e].name == this.option.options[i].name)
        {
          this.selectedOtion =  this.option.options[i].name;
        }
      }
    }
    */
  }


  dismiss(){

console.log(this.selectedOtion);
    this.viewCtrl.dismiss({data:this.selectedOtion , index:this.index});
  }

  select(){



    if (typeof this.selectedOtion != 'undefined'){

      for(var i = 0 ;  i < this.option.options.length;i++){

        if(this.option.options[i].name == this.selectedOtion){
          this.viewCtrl.dismiss({data:this.option.options[i] , index:this.index});
        }
      }



    }

  }


  close(){


    this.viewCtrl.dismiss({data:null});
  }




  ionViewDidLoad() {
    console.log('Hello OptionselectPage Page');
  }

}
