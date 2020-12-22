import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveBuyListPageRoutingModule } from './active-buy-list-routing.module';

import { ActiveBuyListPage } from './active-buy-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveBuyListPageRoutingModule
  ],
  declarations: [ActiveBuyListPage]
})
export class ActiveBuyListPageModule {}
