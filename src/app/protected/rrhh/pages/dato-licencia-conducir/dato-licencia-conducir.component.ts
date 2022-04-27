import { Component, OnInit, Input } from '@angular/core';
import { Licencia } from '../../../interfaces/Licencia';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-dato-licencia-conducir',
  templateUrl: './dato-licencia-conducir.component.html',
  styleUrls: ['./dato-licencia-conducir.component.css']
})
export class DatoLicenciaConducirComponent implements OnInit {

  @Input() regEmp !: Empleado;

  licencia : Licencia[] = [];

  constructor( private rrhhService : RrhhService ) { }

  ngOnInit(): void {
    this.obtenerLicencia(  this.regEmp.codPersona! );
  }


  /**
   * Procedimiento para obtener la licencia de conducir de una persona
   * @param codPersona
   */
   obtenerLicencia( codPersona: number ) {
    this.rrhhService.obtenerLicencia( codPersona ).subscribe((resp) => {
      if (resp) {
        this.licencia = resp;
      }
    }, (err) => {
      console.log(err);
    });

  }

}
