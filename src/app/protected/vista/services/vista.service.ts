import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vista } from '../interface/Vista';

@Injectable({
  providedIn: 'root'
})
export class VistaService {

  private bearer: string ='Bearer ';
  private baseUrl: string = environment.baseUrl;


  constructor( private http: HttpClient ) { }

  /**
   * Procedimiento para obener el menu dinamico por usuario
   */
   obtenerMenuDinamico(  codUsuario: number ): Observable<Vista[]> {

    const url = `${this.baseUrl}/view/vistaDinamica`;
    const cabecera = new HttpHeaders({
      'Content-Type':  'application/json',
       Authorization: this.bearer+'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtamFpbWVzIiwianRpIjoiMzQiLCJub21icmVDb21wbGV0byI6IiBKQUlNRVMgTUFSQ0VMTyBKQVZJRVIiLCJjYXJnbyI6IkFVWElMSUFSIERFIFNJU1RFTUFTIiwiY29kU3VjdXJzYWwiOjEsImNvZEVtcHJlc2EiOjEsInRpcG9Vc3VhcmlvIjoiUk9MRV9BRE0iLCJpYXQiOjE2NDMyOTk1OTQsImV4cCI6MTY0MzMzNTU5NH0.ZJwu_c59iJ3a9B-WPKQCnS17bs0IyszHetNC5vDPmGQyfTsQPuLvXeuHnWOGmAjJq5lugPPWKsuKh1qW2B-rxQ'
    });

    const data = {
      "codUsuario" : codUsuario,
    };
    return this.http.post<Vista[]>( url, data ,{ headers: cabecera });
  }


}
