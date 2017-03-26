import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire ,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';



/*
  Generated class for the Bookinservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Bookinservice {

  constructor(public http: Http,public af:AngularFire) {

  }



  cancelbooking(booking:any,userid:any){
    console.log(booking)
    var userbooking =  this.af.database.object('/profiles/'+userid+'/bookings/'+booking.$key);
    var vendorbooking =  this.af.database.object(booking.dbnode+"/"+booking.typekey+"/bookings/"+booking.vendorkey);

    console.log(booking.dbnode+"/bookings/"+booking.vendorkey);


    userbooking.update({status:"canceled by User"});
   return vendorbooking.update({status:"canceled by User"});
  }

  updatebooking(booking:any,userid:any){
    var userbooking =  this.af.database.object('/profiles/'+userid+'/bookings/'+booking.$key);
    var vendorbooking =  this.af.database.object(booking.dbnode+"/"+booking.typekey+"/bookings/"+booking.vendorkey);


    userbooking.update({status:"Rescheduled and pending" , date:booking.date, timeStarts:booking.timeStarts});
  return   vendorbooking.update({status:"Rescheduled and pending", date:booking.date, timeStarts:booking.timeStarts});

  }




getMybookings(userid:any) {
 return this.af.database.list("profiles/"+userid+"/bookings/");
}


updateVendorWithUseerBookingkey(type:any, typeid:any , bookingid:any, userbookingkey:any){
  var vendor = this.af.database.object(type+"/"+typeid+"/bookings/"+bookingid);

  return  vendor.update({
    userBookingId:userbookingkey
  });

}




  request(userid:any,type:any,typeid:any, booking:any){






   return new Promise((resolve,reject) => {

     //user booking makeup or photo
     var ref = this.af.database.list("profiles/"+userid+"/bookings/");

     //makeup or photo side ref

     var vendor = this.af.database.list(type+"/"+typeid+"/bookings/");

     booking["userBookingId"] = "0";
      booking["userid"] = userid;
     vendor.push(booking).then((res)=>{
       booking["vendorkey"] =  res.key ;

       ref.push(booking).then(res => {

         this.updateVendorWithUseerBookingkey(type,typeid,booking["vendorkey"],res.key).then((res) => {
           resolve(true);
         })

       });

     })


   })


  }





}
