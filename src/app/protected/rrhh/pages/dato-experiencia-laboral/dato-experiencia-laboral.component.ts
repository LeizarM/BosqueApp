import { Component, OnInit, Input } from '@angular/core';
import { ExperienciaLaboral } from '../../../interfaces/ExperienciaLaboral';

@Component({
  selector: 'app-dato-experiencia-laboral',
  templateUrl: './dato-experiencia-laboral.component.html',
  styleUrls: ['./dato-experiencia-laboral.component.css']
})
export class DatoExperienciaLaboralComponent implements OnInit {

  @Input() experienciaLaboral : ExperienciaLaboral[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
