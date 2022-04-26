import { Component, OnInit, Input } from '@angular/core';
import { Telefono } from '../../../interfaces/Telefono';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-dato-telefonos',
  templateUrl: './dato-telefonos.component.html',
  styleUrls: ['./dato-telefonos.component.css']
})
export class DatoTelefonosComponent implements OnInit {

  @Input() regEmp!: Empleado;

  telefonos!: Telefono[];

  constructor( private rrhhService: RrhhService, ) {

  }

  ngOnInit(): void {
    this.regEmp = {...this.regEmp };
    this.obtenerTelefonos( this.regEmp.codPersona! );
  }


  /**
   * Procedimiento para Obtener telefonos por persona
   * @param codPersona
   */
   obtenerTelefonos( codPersona: number ) {
    this.rrhhService.obtenerDatosTelefono( codPersona ).subscribe((resp) => {
      if (resp) {
        this.telefonos = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
