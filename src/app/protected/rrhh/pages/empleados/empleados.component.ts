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

  @ViewChild('dtEmp') dtEmp: Table | undefined;
  empleados : Empleado[] = [];

  constructor(
    private empleadoService: RrhhService,
  ) {
    this.obtenerEmpleados();
  }

  ngOnInit(): void {
  }

  /**
   * Obtentra la lista de los empleados
   */
   obtenerEmpleados():void {

    this.empleadoService.obtenerListEmpleado().subscribe((resp) => {

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
   filtarEmpleados($event: any, stringVal: string) {
    console.log($event);
    this.dtEmp!.filterGlobal(
      ($event.target as HTMLInputElement).value, stringVal
    );
  }
}
