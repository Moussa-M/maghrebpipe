import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagePage } from './page.page';

import { SharedModule } from '../shared/shared.module';
import { ImageViewer } from 'ionic-native-image-viewer/ngx'


const routes: Routes = [
  {
    path: '',
    component: PagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,

  ],
  providers:[ImageViewer,],
  declarations: [PagePage]
})
export class PagePageModule {}
