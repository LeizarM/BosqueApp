import { Component, OnInit, Input } from '@angular/core';
import { Formacion } from '../../../interfaces/Formacion';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dato-formacion',
  templateUrl: './dato-formacion.component.html',
  styleUrls: ['./dato-formacion.component.css'],
  providers: [ MessageService ]
})
export class DatoFormacionComponent implements OnInit {

  @Input() regEmp !: Empleado;

  formacion     : Formacion[] = []
  displayModal  : boolean = false;

  formFormacion : FormGroup = new FormGroup({});

  constructor( private rrhhService    : RrhhService,
               private messageService : MessageService,
               private fb             : FormBuilder ) {

    this.formFormacion = this.fb.group({
      codFormacion    : [ 0 ],
      codEmpleado     : [ 0 ],
      descripcion     : [ '' ],
      duracion        : [ 0 ],
      tipoDuracion    : [ '' ],
      tipoFormacion   : [ '' ],
      fechaFormacion  : [ 0 ],
      audUsuario      : [  0 ]
    });
  }

  ngOnInit(): void {

    this.obtenerFormacion( this.regEmp.codEmpleado! );
  }

  /**
   * Procedimiento para obtener la formacion de un empleado
   * @param codEmpleado
   */
   obtenerFormacion( codEmpleado: number ): void {
    this.rrhhService.obtenerFormacion( codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.formacion = resp;
      }
    }, (err) => {
      this.formacion = [];
      console.log(err);
    });
  }

  /**
   * Para capturar el registro
   * @param form
   */
  capturarRegistro( form : Formacion ): void {

    form.fechaFormacion = new Date( form.fechaFormacion! );

    this.formFormacion = this.fb.group({
      codFormacion    : [ form.codFormacion ],
      codEmpleado     : [ form.codEmpleado ],
      descripcion     : [ form.descripcion, [ Validators.required ] ],
      duracion        : [ form.duracion, [ Validators.required ] ],
      tipoDuracion    : [ form.tipoDuracion, [ Validators.required ] ],
      tipoFormacion   : [ form.tipoFormacion, [ Validators.required ] ],
      fechaFormacion  : [ form.fechaFormacion, [ Validators.required ] ],
      audUsuario      : [ form.audUsuario ]
    });

    this.displayModal = true;


  }

}
