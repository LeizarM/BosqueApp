import { Component, OnInit } from '@angular/core';
import { GaranteReferencia } from '../../../interfaces/GaranteReferencia';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-garante-referencia',
  templateUrl: './garante-referencia.component.html',
  styleUrls: ['./garante-referencia.component.css']
})
export class GaranteReferenciaComponent implements OnInit {


  lstGaranteReferencia : GaranteReferencia[] = [];

  codEmpleado : number = 0;

  constructor(
    private fichaTrabajadorService : FichaTrabajadorService,
    private loginService           : LoginService,
    ) {
      this.codEmpleado =  this.loginService.codEmpleado;
      this.cargarGaranteReferencia( this.codEmpleado );
    }

  ngOnInit(): void {
  }

  /**
   * Para cargar los garante y/o referencias por empleado
   * @param codEmpleado
   */
  cargarGaranteReferencia( codEmpleado : number): void {
    this.fichaTrabajadorService.obtenerGaranteYReferencias( codEmpleado ).subscribe((resp) => {

      if (resp) {
        this.lstGaranteReferencia = resp;
      }

    }, (err) => {
      this.lstGaranteReferencia = [];
      console.log(err);
    });
  }

}
