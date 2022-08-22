import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CabecalhoModule } from '../shared/cabecalho/cabecalho.module';


@NgModule({
  declarations: [ HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CabecalhoModule,
  ]
})
export class HomeModule { }
