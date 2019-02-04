import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { DataService } from '../data.service';
import { PopupComponent } from './popup/popup.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-lang',
  templateUrl: './lang.component.html',
  styleUrls: ['./lang.component.scss']
})
export class LangComponent implements OnInit {
  enableLang:boolean = environment.enableLang;
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async popUpLang(ev: any) {
        const popover = await this.popoverController.create({
          component: PopupComponent,
          event: ev,
          translucent: true
        });
        return await popover.present();
      }
}
