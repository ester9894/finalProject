import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypesListPage } from './types-list.page';

const routes: Routes = [
  {
    path: '',
    component: TypesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesListPageRoutingModule {}
