import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CcrSolicitud } from '../../interfaces/CcrSolicitud';
import { CcrSolicitudDetalle } from '../../interfaces/CcrSolicitudDetalle';


@Injectable({
  providedIn: 'root'
})
export class TccrControlCorteResmadoService {

  private baseUrl: string = environment.baseUrl;
  
  /************************
   *     CONSTRUCTOR      *
   *************************/

  //// constructor() { }
  constructor(private http: HttpClient) { }
  

  menSolicitudEsp: string ="1011001";
  accinSolicitudEsp: string  = "B";

  /************************
   *    PROCEDIMIENTOS    *
   *************************/
    
    /**==================================================**
     *  Procedimiento que obtendra la listado inicial
     *   descendente solicitado
     * @returns List
    **=====================================================**/
    obtenerListInicial( ): Observable<CcrSolicitudDetalle[]> {

      const url = `${this.baseUrl}/tccrControlCorteResmado/solicitudCorte`;
      const registr: CcrSolicitudDetalle ={
         /// idSolicitudDetalle : idSolicitudDetalle
      } ;
  
      return this.http.post<CcrSolicitudDetalle[]>(url , registr )
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



    /**==================================================**
     *  Procedimiento que obtendra la listado Estandar
     *   descendente solicitado
     * @returns List
    **=====================================================**/
    obtenerListStd( ): Observable<CcrSolicitud[]> {

      const url = `${this.baseUrl}/tccrControlCorteResmado/datoEstandar`;
      const registr: CcrSolicitud ={
         
      } ;
  
      return this.http.post<CcrSolicitud[]>(url , registr )
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


    /***
     * Private
     * Limpiara los objetos de la clase
     ***/
    /** 
       private limpiar(){
        this.regSolicitudCcr = new  CcrSolicitudManagedBean();
        this.regSolicitudCcr.setFechaSolicitudString( new Utiles().fechaJ_a_String( this.regSolicitudCcr.getFechaSistemaJ()) );
        
        this.listadoDetalleSolicitudsCcr = new  LinkedList<CcrSolicitudDetalleManagedBean>();
        this.regDetalleSolicitudsCcr = new  CcrSolicitudDetalleManagedBean();
        this.cargarFilasRegistrosLimpios();
    }
    */
}
