import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { Empleado } from 'src/app/protected/interfaces/Empleado';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  regEmp              : Empleado = {};
  regPer              : Persona = {};
  regPerEditar        : Persona = {};
  formDatosPersonales : FormGroup = new FormGroup({});


  codEmpleado : number = 0;
  displayModal : boolean = false;

  constructor(
    private fb            : FormBuilder,
    private loginService  : LoginService,
    private rrhhService   : RrhhService
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerDetalleEmpleado( this.codEmpleado );
   }

  ngOnInit(): void {
  }


  /**
   * Procedimiento para obtener informacion del empleado
   */
   obtenerDetalleEmpleado( codEmpleado : number ): void {

    this.rrhhService.obtenerDetalleEmpleado( codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;

        if(this.regEmp.codPersona){
          this.obtenerDatosPersonales( this.regEmp.codPersona );
        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  /**
   * Procedimiento para obtener los datos personales del empleado
   * @param codPersona
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
   * Para cargar los datos personales de una persona
   */
  cargarInformacionPersonal():void{
    this.displayModal = true;
    this.regPerEditar = {...this.regPer };


  }

}
