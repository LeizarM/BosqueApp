import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Login } from '../interface/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private baseUrl: string = environment.baseUrl;
  private _usuario : Login = {};


  constructor( private http: HttpClient ) { }



  /**
   * Para verificar las credenciales del usuario
   * @param codUsuario
   * @param password
   * @returns
   */
  verificarLogin( codUsuario : string, password : string ): Observable<Login>{

    const url = `${this.baseUrl}/login/login`;
    const cabecera = new HttpHeaders();
    cabecera.append('Content-Type', 'application/json');
    const data = {
      "login" : codUsuario,
      "password" : password
    };
    return this.http.post<Login>( url, data ,{ headers: cabecera })
    .pipe(
      tap( resp => this._usuario = resp )
    );

  }

  /**
   * ========== ATRIBUTOS ENCAPSULADOS ================
   */

  get obtenerUsuario(): Login {
      return {... this._usuario! };
  }

}
