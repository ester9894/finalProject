import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForFutureBuyPageRoutingModule } from './for-future-buy-routing.module';

import { ForFutureBuyPage } from './for-future-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForFutureBuyPageRoutingModule
  ],
  declarations: [ForFutureBuyPage]
})
export class ForFutureBuyPageModule {}
