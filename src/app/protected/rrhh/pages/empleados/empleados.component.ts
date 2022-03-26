import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';
import { Tipos, lstEstadoActivoInactivo } from '../../../interfaces/Tipos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {

  @ViewChild('dtEmp') dtEmp!: Table;
  empleados : Empleado[] = [];
  lstEstados : Tipos[] = [];
  esActivo : number = -1; // por defecto todos


  constructor(
    private empleadoService: RrhhService,
  ) {
    this.lstEstados = lstEstadoActivoInactivo();
    this.obtenerEmpleados( this.esActivo ); //por defecto todos
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
  /**
   * Evento para filtar a los empleados por estado
   */
   filtrarEmpleados(event: any): void {
    console.log(event.value.codTipos);

    this.esActivo = event.value.codTipos;

    this.obtenerEmpleados( this.esActivo );

   }
}
