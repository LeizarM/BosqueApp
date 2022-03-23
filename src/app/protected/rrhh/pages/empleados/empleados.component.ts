import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {

  @ViewChild('dtEmp') dtEmp!: Table;
  empleados : Empleado[] = [];
  esActivo : number = -1;

  constructor(
    private empleadoService: RrhhService,
  ) {
    this.obtenerEmpleados( this.esActivo );
  }

  ngOnInit(): void {
  }

  /**
   * Obtentra la lista de los empleados
   */
   obtenerEmpleados( esActivo : number ) : void {

    this.empleadoService.obtenerListEmpleado( esActivo ).subscribe((resp) => {

      if (resp.length > 0) {
        this.empleados = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Para flitrar contenido, en este caso los empleados
   * @param $event
   */
   filtarEmpleados($event: InputEvent, stringVal: string) {

    this.dtEmp!.filterGlobal(
      ($event.target as HTMLInputElement).value, stringVal
    );
  }
}
