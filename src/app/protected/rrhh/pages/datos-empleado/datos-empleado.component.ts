import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent {

  @Input() regEmp !: Empleado;

  constructor() { }

  ngOnInit(): void {
  }

}
