import { Component, OnInit } from '@angular/core';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { MenuItem } from 'primeng/api';
import { Persona } from '../../../interfaces/Persona';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  regEmp !: Empleado;
  regPer !: Persona;
  itemsDatosPersonales!: MenuItem[];
  /**
   * Lista para los SplitButton
  */


  constructor(
    private rrhhService: RrhhService
  ) {
    this.obtenerDatosPersonales();
    this.obtenerDetalleEmpleado();
    this.cargarOpcionesDatosPersonales();
    this.cargarOpcionesDatosEmpleado();

  }

  ngOnInit(): void {

  }

  /**
   * Cargar opcione smenu boton editar datos Personales
   */
  cargarOpcionesDatosPersonales(): void {

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
   * Cargar opcione smenu boton editar datos Personales
   */
   cargarOpcionesDatosEmpleado(): void {

    this.itemsDatosPersonales = [
      {
        label: 'Nuevo Periodo', icon: 'pi pi-refresh', command: () => {

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
    this.rrhhService.obtenerDetalleEmpleado(65).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;

      }
    }, (err) => {
      console.log(err);
    });

  }

  /**
   * Procedimiento para obtener los datos personales del empleado
   */
  obtenerDatosPersonales(){
    this.rrhhService.obtenerDatosPersonales(201).subscribe((resp)=>{
      if(resp){
        this.regPer = resp;

      }
    },(err)=>{
      console.log(err);
    });
  }

}
