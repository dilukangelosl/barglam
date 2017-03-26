import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Storeservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Storeservice {


  stores: FirebaseListObservable<any[]>;
  store: FirebaseObjectObservable<any>;


  constructor(public http: Http, public af : AngularFire) {

  }

  getStores () {
    return this.af.database.list('/stores');

  }

  getProducts() {

    return this.af.database.list('/store/products');
  }

  search(keyword:any) {
    return this.af.database.list('/store/products',{
      query: {
        orderByChild: 'name',
        endAt: keyword
      }

    });
  }

}
