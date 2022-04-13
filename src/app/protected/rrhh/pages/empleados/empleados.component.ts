import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';
import { Tipos, lstEstadoActivoInactivoTodos } from '../../../interfaces/Tipos';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {

  @ViewChild('dtEmp') dtEmp!: Table;
  empleados : Empleado[] = [];
  lstEstados : Tipos[] = [];


  constructor(
    private empleadoService: RrhhService ) {
    }

  ngOnInit(): void {
    this.lstEstados = lstEstadoActivoInactivoTodos();
    this.obtenerEmpleados( 1 ); //por defecto los activos
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
     this.obtenerEmpleados( event.value );
   }
}
