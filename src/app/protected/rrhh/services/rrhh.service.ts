import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Empleado } from '../../interfaces/Empleado';


@Injectable({
  providedIn: 'root'
})
export class RrhhService {

  private baseUrl: string = environment.baseUrl;
  constructor( private http: HttpClient ) { }

  /**
    * ==========================================
    * ========== PROCEDIMIENTOS ================
    * ==========================================
    */

  /**
   * Procedimiento que obtendra la lista de empleados
   * @returns List
   */
   obtenerListEmpleado( esActivo : number): Observable<Empleado[]>{

    const url = `${this.baseUrl}/rrhh/listEmpleados`;
    const emp : Empleado = {
      relEmpEmpr : {
        esActivo : esActivo
      }
    };

    return this.http.post<Empleado[]>( url, emp )
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

  /**
   * Procedimiento para obtener Detalle de empleados
   */

  obtenerDetalleEmpleado( codEmpleado : number ): Observable<Empleado>{
    const url = `${this.baseUrl}/rrhh/detalleEmpleado`;
    const emp : Empleado = {
      codEmpleado : codEmpleado
    };

    return this.http.post<Empleado>( url, emp )
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
