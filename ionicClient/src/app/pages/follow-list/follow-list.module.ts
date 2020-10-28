import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FollowListPageRoutingModule } from './follow-list-routing.module';

import { FollowListPage } from './follow-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowListPageRoutingModule
  ],
  declarations: [FollowListPage]
})
export class FollowListPageModule {}
