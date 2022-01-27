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
       Authorization: this.bearer+'eyhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtamFpbWVzIiwianRpIjoiMzQiLCJub21icmVFbXBsZWFkbyI6IiBKQUlNRVMgTUFSQ0VMTyBKQVZJRVIiLCJjYXJnbyI6IkFVWElMSUFSIERFIFNJU1RFTUFTIiwiY29kU3VjdXJzYWwiOjEsImNvZEVtcHJlc2EiOjEsInRpcG9Vc3VhcmlvIjoiYWRtIiwiaWF0IjoxNjQzMjA4NDk3LCJleHAiOjE2NDMyNDQ0OTd9.MsmPYGOyQWxnXiXYeGW70J4yTvSTvfwDrrY9kUmpWLJ1th72dWDoV37_w_C3GLY07BryPHP35lLZoADdaQN_6w'
    });

    const data = {
      "codUsuario" : codUsuario,
    };
    return this.http.post<Vista[]>( url, data ,{ headers: cabecera });
  }


}
