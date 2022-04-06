import { Component, OnInit } from '@angular/core';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  regEmp !: Empleado;
  itemsDatosPersonales!: MenuItem[];
  /**
   * Lista para los SplitButton
  */


  constructor(
    private empleadoService: RrhhService
  ) { }

  ngOnInit(): void {
    this.obtenerDetalleEmpleado();
    this.cargarOpcionesDatosEmpleado();
  }

  /**
   * Cargar opcione smenu boton editar datos Personales
   */
  cargarOpcionesDatosEmpleado(): void {

    this.itemsDatosPersonales = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {

        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {

        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },

      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];

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
