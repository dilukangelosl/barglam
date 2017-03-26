import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

/*
  Generated class for the Makeupservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Makeupservice {

  constructor(public http: Http, public af:AngularFire) {




  }

  getMakeup () {
    return this.af.database.list('/makeupartist');

  }

  getService(makeupid:any, cat:any){
    return this.af.database.list('/makeupartist/'+makeupid+'/services/'+cat);
  }

  getPortfolio(makeupid:any){
    return this.af.database.list('/makeupartist/'+makeupid+'/portfolio');
  }

}
