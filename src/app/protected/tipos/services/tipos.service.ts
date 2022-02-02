import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Tipos } from '../interfaces/tipos';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TiposService {


  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * ========================================
   * ========= PROCEDIMIENTOS  ==============
   * ========================================
   */

  /**
   * ==================== PARA EL MODULO DE PRECIOS ===============
   */


  /**
   *  Obtendra los estados de las propuestas
   */
  obtenerEstadosPropuestas(): Observable<Tipos[]> {
    const url = `${this.baseUrl}/price/estadoPropuesta`;
    const data = {};
    console.log("el url es ", url);
    return this.http.post<Tipos[]>( url, data )
      .pipe(
        catchError(e => {
          if ( e.status == 401 ) {
            return throwError(e);
          }
          if ( e.ok === false ) {
            console.error(e.error.error);
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

}
