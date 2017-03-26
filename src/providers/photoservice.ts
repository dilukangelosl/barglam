import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
/*
  Generated class for the Photoservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Photoservice {

  constructor(public http: Http ,  public af:AngularFire) {
    console.log('Hello Photoservice Provider');
  }


  getMakeup () {
    return this.af.database.list('/photographers');

  }

  getService(makeupid:any, cat:any){
    return this.af.database.list('/photographers/'+makeupid+'/services/'+cat);
  }

  getPortfolio(makeupid:any){
    return this.af.database.list('/photographers/'+makeupid+'/portfolio');
  }

}
