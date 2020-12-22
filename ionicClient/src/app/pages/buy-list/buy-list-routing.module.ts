import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyListPage } from './buy-list.page';

const routes: Routes = [
  {
    path: '',
    component: BuyListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyListPageRoutingModule {}
