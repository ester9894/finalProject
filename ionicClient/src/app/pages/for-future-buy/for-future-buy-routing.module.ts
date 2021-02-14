import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForFutureBuyPage } from './for-future-buy.page';

const routes: Routes = [
  {
    path: '',
    component: ForFutureBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForFutureBuyPageRoutingModule {}
