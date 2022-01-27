import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Convert, Login } from '../interface/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private baseUrl: string = environment.baseUrl;
  private _usuario!: Login;
  private _token!: string;


  constructor(private http: HttpClient) { }



   /**
    * ==========================================
    * ========== PROCEDIMIENTOS ================
    * ==========================================
    */

  /**
   * Para verificar las credenciales del usuario
   * @param codUsuario
   * @param password
   * @returns
   */
  verificarLogin(usuario: string, password: string): Observable<Login> {

    const url = `${this.baseUrl}/auth/login`;
    const cabecera = new HttpHeaders();
    cabecera.append('Content-Type', 'application/json');
    const data = {
      "login": usuario,
      "password": password
    };

    return this.http.post<Login>(url, data, { headers: cabecera })
      .pipe(
        tap(resp => {
          if ( resp.token ) {
            this.guardarToken( resp.token );
            this.guardarUsuario( resp );
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error.error))
      );

  }


  /**
   * Guardara el token
   * @param token
   */
  guardarToken( token: string ): void {
    localStorage.setItem('b-tkn', token );
  }

  /**
   * guardara los datos del usuario en el localstorage
   * @param usuario
   */
  guardarUsuario( usuario: Login ): void {
    usuario.token = "";
    this._usuario = usuario;
    localStorage.setItem('b-user', JSON.stringify( this._usuario ) );
  }

  /**
   * Devolvera datos del usuario
   * */
   get obtenerUsuario(): Login {

    if (this._usuario != null || this._usuario != undefined) {
      return this._usuario;
    } else if ( (this._usuario == null || this._usuario == undefined) && localStorage.getItem('b-user') != null) {

      return this._usuario =  JSON.parse( localStorage.getItem('b-user')!) as Login;
    }
    return {};
  }

  /**
   * Devolvera el token
   */
  get obtenerToken(): string {

    if (this._token != null || this._token != undefined   ) {

      return this._token;

    } else if ( (this._token === null || this._token === undefined ) && localStorage.getItem('b-tkn') !== null) {

      return this._token =  ( localStorage.getItem('b-tkn')!);
    }
    return '';
  }

}
