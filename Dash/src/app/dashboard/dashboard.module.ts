import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CabecalhoModule } from '../shared/cabecalho/cabecalho.module';
import { CardModule } from '../shared/card/card.module';
import { VehicleService } from './vehicle.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';


@NgModule({
  declarations: [DashboardComponent, ModalContentComponent, ModalConfirmComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CabecalhoModule,
    CardModule,
    DashboardRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [VehicleService]
})
export class DashboardModule { }
