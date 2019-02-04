import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../../data.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

constructor(private platform: Platform,
  private dataService: DataService,
	private popoverController: PopoverController,
	private translateService: TranslateService) { }

  ngOnInit() {
  }

  selectLang(lang){

  		this.translateService.setDefaultLang(lang);
  		this.translateService.use(lang)
      if(this.platform.is('android') || this.platform.is('ios') ){
          window.localStorage.setItem('lang',lang);
      }
  		this.popoverController.dismiss()
  }
}
