import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private router: Router,
    private loginService: LoginService) { }

  /**
   * Verificar las credenciales del usuario
   */
  verficarLogin(login: string = "mjaimes", password: string = "houki123"): void {

    this.loginService.verificarLogin(login, password)
      .subscribe(resp => {
        console.log(resp);
        if (resp.codUsuario! > 0) {
          this.router.navigate(['./bosque/dashboard']);
        }
      });




  }


}
