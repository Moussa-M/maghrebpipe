import { Component,ViewChild } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService,LangChangeEvent  } from '@ngx-translate/core';
import { DataService } from './data.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private dataService: DataService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appminimize: AppMinimize,
    private router: Router,
    private location: Location,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initLang();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.location.subscribe((value)=>{
          console.log(value);
      })
      this.platform.backButton.subscribe((event) => {
         let url = window.location.pathname
         console.log(url);
        if(url=="/tabs/home" || url=="/tabs/contact" || url=="/tabs/about"){
          history.pushState(null, null, window.location.pathname);
          this.appminimize.minimize(); 
        }
        
     });
    });
  }
  initLang(){
    if(this.platform.is('android') || this.platform.is('ios') ){
          if(window.localStorage.getItem('lang')){
              this.translate.setDefaultLang(window.localStorage.getItem('lang'));
              this.translate.use(window.localStorage.getItem('lang'));
          }else{
              this.translate.setDefaultLang('ar');
              this.translate.use('ar');
          }
          
      }else{
         this.translate.setDefaultLang('ar');
         this.translate.use('ar'); 
      }
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          this.translate.setDefaultLang(event.lang);
         this.translate.use(event.lang); 
      }); 
  }
  getTranslateService(){
    return this.translate;
  }
}
