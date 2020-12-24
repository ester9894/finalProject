import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./pages/folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'add-account',
    loadChildren: () => import('./pages/add-account/add-account.module').then( m => m.AddAccountPageModule)
  },
  
  {
    path: 'types-list',
    loadChildren: () => import('./pages/types-list/types-list.module').then( m => m.TypesListPageModule)
  },
  
  {
    path: 'show-list',
    loadChildren: () => import('./pages/show-list/show-list.module').then( m => m.ShowListPageModule)
  },
  {
    path: 'follow-list',
    loadChildren: () => import('./pages/follow-list/follow-list.module').then( m => m.FollowListPageModule)
  },
  {
    path: 'create-list',
    loadChildren: () => import('./pages/create-list/create-list.module').then( m => m.CreateListPageModule)
  },
  {
    path: 'join',
    loadChildren: () => import('./pages/join/join.module').then( m => m.JoinPageModule)
  },

  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'buy-list',
    loadChildren: () => import('./pages/buy-list/buy-list.module').then( m => m.BuyListPageModule)
  },
  {
    path: 'active-buy-list',
loadChildren: () => import('./pages/active-buy-list/active-buy-list.module').then( m => m.ActiveBuyListPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
