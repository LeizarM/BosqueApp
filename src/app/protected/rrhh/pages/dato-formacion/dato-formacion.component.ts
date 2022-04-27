import { Component, OnInit, Input } from '@angular/core';
import { Formacion } from '../../../interfaces/Formacion';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-dato-formacion',
  templateUrl: './dato-formacion.component.html',
  styleUrls: ['./dato-formacion.component.css']
})
export class DatoFormacionComponent implements OnInit {

  @Input() regEmp !: Empleado;

  formacion: Formacion[] = []

  constructor( private rrhhService: RrhhService ) { }

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

}
