import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { Persona } from '../../../interfaces/Persona';
import { Email } from '../../../interfaces/Email';
import { Telefono } from '../../../interfaces/Telefono';
import { ExperienciaLaboral } from '../../../interfaces/ExperienciaLaboral';
import { Formacion } from '../../../interfaces/Formacion';
import { Licencia } from '../../../interfaces/Licencia';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

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
  formacion!: Formacion[];
  licencia!: Licencia[];


  /**
   * Lista para los SplitButton
  */


  constructor(
    private rrhhService: RrhhService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    //this.activatedRoute.queryParamMap.subscribe((params: any) => console.log( params ));
     this.activatedRoute.queryParams
      .subscribe(params => this.regEmp = params );
    console.log(this.regEmp);

    /* this.obtenerDatosPersonales( this.regEmp.codPersona! );
    this.obtenerDetalleEmpleado( this.regEmp.codEmpleado! );
    this.cargarOpcionesDatosPersonales();
    this.cargarOpcionesDatosEmpleado();
    this.obtenerEmails();
    this.obtenerTelefonos();
    this.obtenerExperienciaLaboral();
    this.obtenerFormacion();
    this.obtenerLicencia(); */


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
  obtenerDetalleEmpleado( codEmpleado: number ) {
    this.rrhhService.obtenerDetalleEmpleado(  codEmpleado ).subscribe((resp) => {
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
  obtenerDatosPersonales(codPersona: number) {
    this.rrhhService.obtenerDatosPersonales(codPersona).subscribe((resp) => {
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

  obtenerTelefonos() {
    this.rrhhService.obtenerDatosTelefono(201).subscribe((resp) => {
      if (resp) {
        this.telefonos = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Procedimiento para Obtener la experiencia laboral de un empleado
   */
  obtenerExperienciaLaboral() {
    this.rrhhService.obtenerExperienciaLaboral(65).subscribe((resp) => {
      if (resp) {
        this.experienciaLaboral = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener la formacion de un empleado
   */
  obtenerFormacion() {
    this.rrhhService.obtenerFormacion(65).subscribe((resp) => {
      if (resp) {
        this.formacion = resp;
      }
    }, (err) => {
      this.formacion = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener la licencia de conducir de una persona
   */
  obtenerLicencia() {
    this.rrhhService.obtenerLicencia(38).subscribe((resp) => {
      if (resp) {
        this.licencia = resp;
      }
    }, (err) => {
      console.log(err);
    });

  }

}
