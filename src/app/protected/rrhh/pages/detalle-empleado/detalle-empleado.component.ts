import { Component, OnInit } from '@angular/core';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  regEmp !: Empleado;

  constructor(
    private empleadoService: RrhhService
  ) { }

  ngOnInit(): void {
    this.obtenerDetalleEmpleado();
  }

  /**
   * Procedimiento para obtener el detalle empleado
   */
  obtenerDetalleEmpleado() {
    this.empleadoService.obtenerDetalleEmpleado(65).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;
        console.log(this.regEmp);
      }
    }, (err) => {
      console.log(err);
    });

  }

}
