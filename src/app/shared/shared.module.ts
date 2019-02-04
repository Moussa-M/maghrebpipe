import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangComponent } from '../lang/lang.component';
import { IonicModule } from '@ionic/angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { DataService } from '../data.service';
import { PopupComponent } from '../lang/popup/popup.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [LangComponent,PopupComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }), 
  ],
  providers:[
      DataService
  ],
  exports: [LangComponent,TranslateModule],
  entryComponents : [PopupComponent]
})
export class SharedModule { }
