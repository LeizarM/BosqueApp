import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../auth/services/login.service';
import { Login } from '../../../auth/interface/Login';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {



  constructor( private loginService: LoginService ) {

  }

  ngOnInit(): void {
  }

  /**
   * Obteniendo el usuario
   */
  get obtenerUsuario(): Login  {
    return this.loginService.obtenerUsuario;
  }
}
