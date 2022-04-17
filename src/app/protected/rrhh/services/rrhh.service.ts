import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Empleado } from '../../interfaces/Empleado';
import { Persona } from '../../interfaces/Persona';
import { Email } from '../../interfaces/Email';
import { Telefono } from '../../interfaces/Telefono';


@Injectable({
  providedIn: 'root'
})
export class RrhhService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  /**
    * ==========================================
    * ========== PROCEDIMIENTOS ================
    * ==========================================
    */

  /**
   * Procedimiento que obtendra la lista de empleados
   * @returns List
   */
  obtenerListEmpleado(esActivo: number): Observable<Empleado[]> {

    const url = `${this.baseUrl}/rrhh/listEmpleados`;
    const emp: Empleado = {
      relEmpEmpr: {
        esActivo: esActivo
      }
    };

    return this.http.post<Empleado[]>(url, emp)
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

  obtenerDetalleEmpleado(codEmpleado: number): Observable<Empleado> {
    const url = `${this.baseUrl}/rrhh/detalleEmpleado`;
    const emp: Empleado = {
      codEmpleado: codEmpleado
    };

    return this.http.post<Empleado>(url, emp)
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
   * Procedimiento para obtener los datos personales de un empleado
   */
  obtenerDatosPersonales(codPersona: number): Observable<Persona> {
    const url = `${this.baseUrl}/rrhh/datosPersonales`;
    const per: Persona = {
      codPersona: codPersona
    };

    return this.http.post<Persona>(url, per)
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
   * Procedimiento para obtener los emails por persona
   */
  obtenerDatosEmail(codPersona: number): Observable<Email[]> {

    const url = `${this.baseUrl}/rrhh/emailPersona`;
    const email: Email = {
      codPersona: codPersona
    };

    return this.http.post<Email[]>(url, email)
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
   * Procedimiento para obtener lo telefonos por persona
   */
  obtenerDatosTelefono ( codPersona : number ): Observable<Telefono[]>{

    const url = `${this.baseUrl}/rrhh/telfPersona`;
    const telf: Telefono = {
      codPersona: codPersona
    };

    return this.http.post<Telefono[]>(url, telf)
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
