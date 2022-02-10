import { Component, OnInit } from '@angular/core';
import { Autorizacion } from '../../interface/Autorizacion';
import { PreciosService } from '../../services/precios.service';
import { Tipos } from '../../../tipos/interfaces/tipos';
import { TiposService } from 'src/app/protected/tipos/services/tipos.service';




@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {

  autorizaciones: Autorizacion[] = [];
  estadosPropuesta: Tipos[] = [];


  constructor( private autorizacion: PreciosService,
               private tipos: TiposService )
  {
    this.obtenerListaPropuesta();

  }

  ngOnInit(): void {
    this.obtenerEstadosPropuesta();
  }


  /**
   * Obtentra la lista de las propuestas
   */
  obtenerListaPropuesta():void {

    this.autorizacion.obtenerListAutorizacion().subscribe((resp) => {

      if (resp.length > 0) {
        this.autorizaciones = resp;
        console.log(this.autorizaciones);
      }
    }, (err) => {
      console.log(err);

    });
  }
  /**
   * Obtendra los estados de las propuestas
   */
  obtenerEstadosPropuesta(): void {
    this.tipos.obtenerEstadosPropuestas().subscribe((resp) => {
      if (resp.length > 0) {
       this.estadosPropuesta = resp;
       console.log(this.estadosPropuesta);
      }
    }, (err) => {
      console.log(err);
    });

  }




}
