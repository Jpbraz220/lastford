import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemModule } from '../shared/mensagem/mensagem.module'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    MensagemModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule { }
