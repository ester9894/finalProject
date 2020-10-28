import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FollowListPage } from './follow-list.page';

const routes: Routes = [
  {
    path: '',
    component: FollowListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FollowListPageRoutingModule {}
