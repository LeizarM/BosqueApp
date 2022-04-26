import { Component, OnInit, Input } from '@angular/core';
import { Formacion } from '../../../interfaces/Formacion';

@Component({
  selector: 'app-dato-formacion',
  templateUrl: './dato-formacion.component.html',
  styleUrls: ['./dato-formacion.component.css']
})
export class DatoFormacionComponent implements OnInit {

  @Input() formacion: Formacion[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
