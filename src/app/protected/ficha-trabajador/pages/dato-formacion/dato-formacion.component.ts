import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/auth/services/login.service';
import { Formacion } from 'src/app/protected/interfaces/Formacion';
import { lstTipoFormacion, lstTipoMedicion, Tipos } from 'src/app/protected/interfaces/Tipos';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { Utiles } from 'src/app/protected/Utiles/Utiles';

@Component({
  selector: 'app-dato-formacion',
  templateUrl: './dato-formacion.component.html',
  styleUrls: ['./dato-formacion.component.css'],
  providers: [ MessageService ]
})
export class DatoFormacionComponent implements OnInit {

  // Variables
  codEmpleado : number = 0;
  displayModal : boolean = false;

  //Listas o Arrays
  lstFormacion  : Formacion[] = [];
  lstMedicion   : Tipos[] = [];
  lstMedicionDropDown   : Tipos[] = [];

  //Formularios
  formFormacion : FormGroup = new FormGroup({});


  constructor(
    private rrhhService   : RrhhService,
    private loginService  : LoginService,
    private fb            : FormBuilder,
    private messageService : MessageService,
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerFormacion( this.codEmpleado );

    this.lstMedicion  = lstTipoMedicion();
    this.lstMedicionDropDown =  lstTipoFormacion();

  }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  /**
   * Iniciara el formulario
   */
  iniciarFormulario(): void {
    this.formFormacion = this.fb.group({
      codFormacion    : [ 0 ],
      codEmpleado     : [ 0 ],
      descripcion     : [ '' ],
      duracion        : [ 0 ],
      tipoDuracion    : [ 0 ],
      tipoFormacion   : [ '' ],
      fechaFormacion  : [ 0 ],
      audUsuario      : [ 0 ]
    });
  }


  /**
   * Procedimiento para obtener la formacion de un empleado
   * @param codEmpleado
   */
  obtenerFormacion( codEmpleado: number ): void {
    this.rrhhService.obtenerFormacion( codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.lstFormacion = resp;
      }
    }, (err) => {
      this.lstFormacion = [];
      console.log(err);
    });
  }

  guardar():void {
    let temp: Formacion = {};
    temp = this.formFormacion.value;

    this.rrhhService.registrarFormacion(temp).subscribe((resp) => {


      if ( resp && resp.ok === 'ok') {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: 'Registro Actualizado' });
        this.obtenerFormacion( temp.codEmpleado! );
        this.displayModal = false;
      } else {
        console.log(resp);
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Accion Invalida', detail: "No se pudo Actualizar la información" });
      }
    }, (err) => {
      console.log("Error General");
      console.log(err);
    });
  }


  /**
   * Para capturar el registro
   * @param form
   */
  capturarRegistro( form : Formacion ): void {
    let temp : Formacion = {...form };

    temp.fechaFormacion = new Utiles().fechaPrimeNGtoTS( temp.fechaFormacion! );
    //temp.fechaFormacion.setDate(temp.fechaFormacion.getDate() + 1);



    this.formFormacion = this.fb.group({
      codFormacion    : [ temp.codFormacion, [ Validators.min(1) ] ],
      codEmpleado     : [ temp.codEmpleado ],
      descripcion     : [ temp.descripcion, [ Validators.required ] ],
      duracion        : [ temp.duracion, [ Validators.required ] ],
      tipoDuracion    : [ temp.tipoDuracion, [ Validators.required ] ],
      tipoFormacion   : [ temp.tipoFormacion, [ Validators.required ] ],
      fechaFormacion  : [ temp.fechaFormacion, [ Validators.required ] ],
      audUsuario      : [ temp.audUsuario ]
    });

    this.displayModal = true;

  }

}
