import { Component, OnInit } from '@angular/core';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';
import { Dependiente } from '../../../interfaces/Dependiente';
import { LoginService } from 'src/app/auth/services/login.service';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { RrhhService } from '../../../rrhh/services/rrhh.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependiente',
  templateUrl: './dependiente.component.html',
  styleUrls: ['./dependiente.component.css']
})
export class DependienteComponent implements OnInit {

  //Listas
  lstDependientes : Dependiente[] = [];

  //Objetos
  datoPersonaDep  : Persona = {};

  //variables
  codEmpleado     : number = 0;
  displayDialog   : boolean = false;

  //Formularios
  formDatosPersonalesDep  : FormGroup = new FormGroup({});

  constructor(
    private rrhhService            : RrhhService,
    private fichaTrabajadorService : FichaTrabajadorService,
    private loginService           : LoginService,
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.cargarListaDependientes( this.codEmpleado );
  }

  ngOnInit(): void {

  }


   /**
    * Procedimiento para obtener dependientes por Empleado
    * @param codEmpleado
    */
  cargarListaDependientes( codEmpleado : number): void {
    this.fichaTrabajadorService.obtenerDependientes(codEmpleado).subscribe((resp) => {

      if (resp) {
        this.lstDependientes = resp;
        console.log(this.lstDependientes);
      }

    }, (err) => {
      this.lstDependientes = [];
      console.log(err);
    });
  }

  /**
   * Cargara los datos de un dependiente
   * @param codPersona
   */
  cargarDatosDependiente( codPersona : number ) : void {

    //se carga los datos de la persona dependiente seleccionada
    this.obtenerDatosPersonales(codPersona);

    this.displayDialog = true;

  }
  /**
   * Procedimiento
   * @param codPersona
   */
  obtenerDatosPersonales( codPersona: number ) {
    this.rrhhService.obtenerDatosPersonales(codPersona).subscribe((resp) => {
      if (resp) {
        this.datoPersonaDep = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

  guardar(){

  };

}
