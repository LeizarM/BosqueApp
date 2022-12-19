import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboral } from 'src/app/protected/interfaces/ExperienciaLaboral';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dato-experiencia',
  templateUrl: './dato-experiencia.component.html',
  styleUrls: ['./dato-experiencia.component.css']
})
export class DatoExperienciaComponent implements OnInit {

  //Formulario
  formExperiencia : FormGroup = new FormGroup({});



  //Variables
  codEmpleado : number = 0;
  displayModal : boolean = false;

  //Listas
  lstExperienciaLaboral : ExperienciaLaboral[] = [];

  constructor(
    private rrhhService  : RrhhService,
    private loginService : LoginService,
    private fb           : FormBuilder
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerExperienciaLaboral( this.codEmpleado );
  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  /**
   * Procedimiento para cargar el formulario
   */
  iniciarFormulario():void {

    this.formExperiencia = this.fb.group({

      codExperienciaLaboral : [ 0 ],
      codEmpleado           : [ this.codEmpleado ],
      nombreEmpresa         : [ '', [ Validators.required, Validators.minLength(3)] ],
      cargo                 : [ '', [ Validators.required, Validators.minLength(3)] ],
      descripcion           : [ '', [ Validators.required, Validators.minLength(3)] ],
      fechaInicio           : [ 0,  [ Validators.required, Validators.nullValidator] ],
      fechaFin              : [ 0,  [ Validators.required, Validators.nullValidator] ],
      nroReferencia         : [ '', [ Validators.min(1) ] ],
      audUsuario            : [ this.loginService.codUsuario ]

    });
  }

  /**
   * Procedimiento para Obtener la experiencia laboral de un empleado
   * @param codEmpleado
   */
  obtenerExperienciaLaboral(codEmpleado: number): void {
    this.rrhhService.obtenerExperienciaLaboral(codEmpleado).subscribe((resp) => {
      if (resp) {
        this.lstExperienciaLaboral = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Para cargar el registro
   */
  cargarRegistro():void {
    this.displayModal = true;
  }

  /**
   * Procedimiento para guardar la informacion para la experiencia laboral
   */
  guardar():void{

  }
}
