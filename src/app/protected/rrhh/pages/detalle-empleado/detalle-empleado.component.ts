import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { Persona } from '../../../interfaces/Persona';
import { Email } from '../../../interfaces/Email';
import { Telefono } from '../../../interfaces/Telefono';
import { ExperienciaLaboral } from '../../../interfaces/ExperienciaLaboral';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  regEmp !: Empleado;
  regPer !: Persona;
  itemsDatosPersonales!: MenuItem[];
  emails!: Email[];
  telefonos!: Telefono[];
  experienciaLaboral!: ExperienciaLaboral[];


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
    this.obtenerEmails();
    this.obtenerTelefonos();
    this.obtenerExperienciaLaboral();


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
    this.rrhhService.obtenerDetalleEmpleado(141).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;
        console.log(resp);
      }
    }, (err) => {
      console.log(err);
    });

  }

  /**
   * Procedimiento para obtener los datos personales del empleado
   */
  obtenerDatosPersonales() {
    this.rrhhService.obtenerDatosPersonales(201).subscribe((resp) => {
      if (resp) {
        this.regPer = resp;

      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener los correos de una persona
   */
  obtenerEmails() {
    this.rrhhService.obtenerDatosEmail(201).subscribe((resp) => {
      if (resp) {
        this.emails = resp;

      }
    }, (err) => {
      this.emails = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para Obtener telefonos por persona
   */

  obtenerTelefonos(){
    this.rrhhService.obtenerDatosTelefono(201).subscribe((resp)=>{
      if(resp){
        this.telefonos = resp;
      }
    },(err)=>{
      console.log(err);
    });
  }

  /**
   * Procedimiento para Obtener la experiencia laboral de un empleado
   */
  obtenerExperienciaLaboral(){
    this.rrhhService.obtenerExperienciaLaboral(65).subscribe((resp)=>{
      if(resp){
        this.experienciaLaboral = resp;
      }
    },(err)=>{
      console.log(err);
    });
  }


}
