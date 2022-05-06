import { Component, OnInit, Inject } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';

import { TranslateService } from '@ngx-translate/core';
import { MyEvent } from 'src/services/myevent.services';
import { Constants } from 'src/models/contants.models';
import { APP_CONFIG, AppConfig } from './app.config';
import { ModalController } from '@ionic/angular'; 
import { BuyappalertPage } from '../app/buyappalert/buyappalert.page'; 
import { VtPopupPage } from './vt-popup/vt-popup.page';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  rtlSide = "left";
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'home',
      url: '/home',
      icon: 'zmdi zmdi-home'
    },
    {
      title: 'my_profile',
      url: '/my-profile',
      icon: 'zmdi zmdi-assignment-account'
    },
    {
      title: 'my_orders',
      url: '/my-orders',
      icon: 'zmdi zmdi-shopping-cart'
    },
    // {
    //   title: 'languges',
    //   url: '/language',
    //   icon: 'zmdi zmdi-globe'
    // },
    // {
    //   title: 'logout',
    //   url: '/sign-in',
    //   icon: 'zmdi zmdi-open-in-new'
    // },

  ];


  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private platform: Platform, private navCtrl: NavController,
    private modalController: ModalController,
    private translate: TranslateService, private myEvent: MyEvent, private storage: Storage,
    private auth: AuthService,) {
    this.initializeApp();
    this.myEvent.getLanguageObservable().subscribe(value => {
      this.navCtrl.navigateRoot(['./']);
      this.globalize(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (this.platform.is('hybrid')) {
        const { SplashScreen, StatusBar } = Plugins;
        SplashScreen.hide({fadeOutDuration:1000});
        StatusBar.setStyle({ style: StatusBarStyle.Light });
        
        let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
        this.globalize(defaultLang);
      }
      
    });
  }

  globalize(languagePriority) {
    console.log(languagePriority);
    this.translate.setDefaultLang("es");
    let defaultLangCode = this.config.availableLanguages[2].code;
    console.log('defaultLangCode');
    console.log(defaultLangCode);
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }

  async ngOnInit() {
    await this.storage.create();
    this.globalize('es');
    if (this.config.demoMode) {
      setTimeout(() => {
        this.presentModal();
      }, 15000)
    }

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  

// buyappalert(){
//     this.modalController.create({component:BuyappalertPage}).then((modalElement)=>
//     {
//       modalElement.present();
//     }
//     )
//   }  


  // developed_by() {
  //  window.open("https://opuslab.works/", '_system', 'location=no');
  // }
 
  async presentModal() {
    const modal = await this.modalController.create({
      component: VtPopupPage,
    });
    return await modal.present();
  }

  async logOut() {
    this.auth.logout();
  }
}
