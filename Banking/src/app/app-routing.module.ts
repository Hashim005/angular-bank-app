import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, loginGuard } from './Auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:"full"
  },
  {
    path: '',
    loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule),
    canActivate:[loginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
