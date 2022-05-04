import { Component, OnInit } from '@angular/core';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { Persona } from '../../../interfaces/Persona';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  regEmp  : Empleado;
  regPer  !: Persona;


  constructor(
    private rrhhService: RrhhService,
  ) {

    this.regEmp = JSON.parse( localStorage.getItem('b-emp')! ); //recuperamos datos del localstorage

    if( this.regEmp === undefined || this.regEmp === null) this.regEmp = {}

    this.obtenerDetalleEmpleado( this.regEmp.codEmpleado! );

  }

  ngOnInit(): void {

  }


  /**
   *  Procedimiento para obtener el detalle empleado
   * @param codEmpleado
   */
  obtenerDetalleEmpleado( codEmpleado: number ) {
    this.rrhhService.obtenerDetalleEmpleado(  codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;
        console.log(this.regEmp);
      }
    }, (err) => {
      console.log(err);
    });

  }




}
