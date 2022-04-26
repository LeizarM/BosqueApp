import { Component, OnInit, Input } from '@angular/core';
import { Telefono } from '../../../interfaces/Telefono';

@Component({
  selector: 'app-dato-telefonos',
  templateUrl: './dato-telefonos.component.html',
  styleUrls: ['./dato-telefonos.component.css']
})
export class DatoTelefonosComponent implements OnInit {

  @Input() telefonos: Telefono[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
