import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ItemsPage } from './items.page';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: ItemsPage
  },
  {
    path:':id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ItemsPage, DetailsComponent]
})
export class ItemsPageModule {}
