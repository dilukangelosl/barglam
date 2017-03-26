import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {RegisterPage} from '../pages/register/register';
import {SalonsPage} from '../pages/salons/salons';
import {PhotoPage} from '../pages/photo/photo';
import {MakeupPage} from '../pages/makeup/makeup';
import {SearchPage} from '../pages/search/search';
import {StorePage} from '../pages/store/store';
import {StoreinfoPage} from '../pages/storeinfo/storeinfo';
import {Reverse} from '../pipes/reverse';
import {MakeupinfoPage} from '../pages/makeupinfo/makeupinfo';
import {CartPage} from '../pages/cart/cart';
import {WelcomPage} from '../pages/welcom/welcom';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {ProductviewPage} from '../pages/productview/productview';
import {AddtocartPage} from '../pages/addtocart/addtocart';
import {CheckoutPage} from '../pages/checkout/checkout';
import {MyordersPage} from '../pages/myorders/myorders';
import {MyordersviewPage} from '../pages/myordersview/myordersview';
import {BookingsPage} from '../pages/bookings/bookings';
import {MybookingsPage} from '../pages/mybookings/mybookings';
import {MybookingsviewPage} from  '../pages/mybookingsview/mybookingsview';
import { Ionic2RatingModule } from 'ionic2-rating';
import {MomentModule} from 'angular2-moment';
import {NewstorePage} from '../pages/newstore/newstore'
import {StorehomePage} from '../pages/storehome/storehome'
import  {StorecategoriesPage} from  '../pages/storecategories/storecategories';
import {StoremyPage} from '../pages/storemy/storemy';
import {CategoryPage} from '../pages/category/category';
import {CategoryproductPage} from '../pages/categoryproduct/categoryproduct';
import {ProductsearchPage} from '../pages/productsearch/productsearch';
import {StoresettingsPage} from  '../pages/storesettings/storesettings';
import  {StoreaccountPage} from '../pages/storeaccount/storeaccount'
import {OptionselectPage} from '../pages/optionselect/optionselect';

import {AccountPage} from '../pages/account/account'
import {SelectPage} from '../pages/select/select';
import {PhotoinfoPage} from '../pages/photoinfo/photoinfo';
import {PhotobookingPage} from '../pages/photobooking/photobooking';
import {PhotobookingselectPage} from '../pages/photobookingselect/photobookingselect';
import {Welcome2Page} from '../pages/welcome2/welcome2';
import { TextMaskModule } from 'angular2-text-mask';
import {ResetpasswordPage} from '../pages/resetpassword/resetpassword';
import {AboutPage} from '../pages/about/about';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {Authservice} from '../providers/authservice';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCW22GltSLGEP777T_oIRYx6GKhr0t_vbU",
  authDomain: "glambardemo.firebaseapp.com",
  databaseURL: "https://glambardemo.firebaseio.com",
  storageBucket: "glambardemo.appspot.com",
  messagingSenderId: "153354299040"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8287e63f',
  },
  'push': {
    'sender_id': '153354299040',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};


@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    HomePage,
    RegisterPage,
    SalonsPage,
    PhotoPage,
    MakeupPage,
    SearchPage,
    StorePage,
    StoreinfoPage,
    Reverse,
    MakeupinfoPage,
    CartPage,
    WelcomPage,
    ProductviewPage,
    AddtocartPage,
    CheckoutPage,
    MyordersPage,
    MyordersviewPage,
    BookingsPage,
    MybookingsPage,
    MybookingsviewPage,
    SelectPage,
    NewstorePage,
    StorehomePage,
    StorecategoriesPage,
    StoremyPage,
    CategoryPage,
    CategoryproductPage,
    ProductsearchPage,
    StoresettingsPage,
    StoreaccountPage,
    OptionselectPage,
    AccountPage,
    PhotoinfoPage,
    PhotobookingPage,
    PhotobookingselectPage,
    Welcome2Page,
    ResetpasswordPage,
    AboutPage



  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    CloudModule.forRoot(cloudSettings),
    Ionic2RatingModule,
    MomentModule,
    TextMaskModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    LoginPage,
    HomePage,
    RegisterPage,
    SalonsPage,
    PhotoPage,
    MakeupPage,
    SearchPage,
    StorePage,
    StoreinfoPage,
    MakeupinfoPage,
    CartPage,
    WelcomPage,
    ProductviewPage,
    AddtocartPage,
    CheckoutPage,
    MyordersPage,
    MyordersviewPage,
    BookingsPage,
    MybookingsPage,
    MybookingsviewPage,
    SelectPage,
    NewstorePage,
    StorehomePage,
    StorecategoriesPage,
    StoremyPage,
    CategoryPage,
    CategoryproductPage,
    ProductsearchPage,
    StoresettingsPage,
    StoreaccountPage,
    OptionselectPage,
    AccountPage,
    PhotoinfoPage,
    PhotobookingPage,
    PhotobookingselectPage,
    Welcome2Page,
    ResetpasswordPage,
    AboutPage



  ],
  providers: [Authservice]
})
export class AppModule {}
