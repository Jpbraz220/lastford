import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren: ()=> import('./login/login.module').then((m)=> m.LoginModule),
  },
  {
    path:'home',
    loadChildren: ()=> import('./home/home.module').then((m)=> m.HomeModule),
    canLoad: [AutenticacaoGuard],
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then((m)=> m.DashboardModule),
    // canLoad: [AutenticacaoGuard],
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
