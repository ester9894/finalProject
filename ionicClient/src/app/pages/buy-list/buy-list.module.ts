import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyListPageRoutingModule } from './buy-list-routing.module';

import { BuyListPage } from './buy-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyListPageRoutingModule
  ],
  declarations: [BuyListPage]
})
export class BuyListPageModule {}
