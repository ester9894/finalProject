import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypesListPageRoutingModule } from './types-list-routing.module';

import { TypesListPage } from './types-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypesListPageRoutingModule
  ],
  declarations: [TypesListPage]
})
export class TypesListPageModule {}
