import { Component, Input } from '@angular/core';
import { Persona } from '../../../interfaces/Persona';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {

  @Input() regPer : Persona = {};
  @Input() regEmp !: Empleado;

  constructor(

  ) { }

  ngOnInit(): void {
  }

}
