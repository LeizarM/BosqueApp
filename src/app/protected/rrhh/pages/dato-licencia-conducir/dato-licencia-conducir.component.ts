import { Component, OnInit, Input } from '@angular/core';
import { Licencia } from '../../../interfaces/Licencia';

@Component({
  selector: 'app-dato-licencia-conducir',
  templateUrl: './dato-licencia-conducir.component.html',
  styleUrls: ['./dato-licencia-conducir.component.css']
})
export class DatoLicenciaConducirComponent implements OnInit {

  @Input() licencia : Licencia[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
