import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Vista } from 'src/app/protected/interfaces/Vista';

@Injectable({
  providedIn: 'root'
})
export class VistaService {

  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient ) { }

  /**
   * Procedimiento para obener el menu dinamico por usuario
   */
   obtenerMenuDinamico(  codUsuario: number ): Observable<Vista[]> {

    const url = `${this.baseUrl}/view/vistaDinamica`;

    const data = { "codUsuario" : codUsuario   };

    return this.http.post<Vista[]>( url, data )
            .pipe(
              catchError(e => {
                if (e.status == 401) {

                  return throwError(e);
                }
                if (e.ok === false) {
                  console.error(e.error.error);
                  return throwError(e);
                }
                return throwError(e);
              })
            );
  }


}
