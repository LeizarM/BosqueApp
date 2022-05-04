import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent {

  @Input() regEmp !: Empleado;

  registroEmpleado : Empleado = {};

  displayModal: boolean = false;

  formEmpleado: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.registroEmpleado = this.regEmp;
  }


  /**
   * Procedimiento para desplegar el modal
   */
  desplegarModal(): void {
    this.displayModal = true;
  }

}
