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
       Authorization: this.bearer+'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtamFpbWVzIiwiaWF0IjoxNjQyNzgxNjQ2LCJleHAiOjE2NDI4MTc2NDZ9.Okrv0rMwGUupqdnfet4GlCMNZBCVSUzxCxGl5YUasDasnIc3Dkq3YWKKpO6tO6pLlrokZrpXDQnjcgnuek7EyQ'
    });

    const data = {
      "codUsuario" : codUsuario,
    };
    return this.http.post<Vista[]>( url, data ,{ headers: cabecera });
  }


}
