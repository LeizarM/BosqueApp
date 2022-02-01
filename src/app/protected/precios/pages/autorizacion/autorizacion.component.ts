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
  estadosPropuesta!: Tipos[];

  constructor( private autorizacion: PreciosService,
               private tipos: TiposService )
  {
    this.obtenerListaPropuesta();

  }

  ngOnInit(): void {

  }


  /**
   * Obtentra la lista de las propuestas
   */
  obtenerListaPropuesta() {

    this.autorizacion.obtenerListAutorizacion().subscribe((resp) => {

      if (resp.length > 0) {
        this.autorizaciones = resp;
      }
    }, (err) => {
      console.log(err);

    });
  }
  /**
   * Obtendra los estados de las propuestas
   */
  obtenerEstadosPropuesta() {
    this.tipos.obtenerEstadosPropuestas().subscribe((resp) => {
      if (resp.length > 0) {
        this.estadosPropuesta = resp;
      }
    }, (err) => {
      console.log(err);
    });

  }

}
