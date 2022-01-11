import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vista } from '../interface/Vista';

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

    const url = `${this.baseUrl}/login/vistaDinamica`;
    console.log("el url es= "+url);
    const cabecera = new HttpHeaders();
    cabecera.append('Content-Type', 'application/json');
    const data = {
      "codUsuario" : codUsuario,
    };
    return this.http.post<Vista[]>( url, data ,{ headers: cabecera });
  }


}
