import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { Routes, RouterModule } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario='';
  senha='';

  constructor(private authService: AutenticacaoService, private router: Router ) {}

  ngOnInit(): void {}

  login() {
    this.authService.autenticar(this.usuario,this.senha).subscribe(
      ()=> {
      this.router.navigate(['home'])
    },
    (error)=> {
      alert('Usuário ou senha errado');
      console.log(error);
    }
    );
  }

}
