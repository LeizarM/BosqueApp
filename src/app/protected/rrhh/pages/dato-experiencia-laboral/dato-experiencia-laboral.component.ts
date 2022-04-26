import { Component, OnInit, Input } from '@angular/core';
import { ExperienciaLaboral } from '../../../interfaces/ExperienciaLaboral';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';

@Component({
  selector: 'app-dato-experiencia-laboral',
  templateUrl: './dato-experiencia-laboral.component.html',
  styleUrls: ['./dato-experiencia-laboral.component.css']
})
export class DatoExperienciaLaboralComponent implements OnInit {

  @Input() regEmp !: Empleado;

  experienciaLaboral : ExperienciaLaboral[] = [];

  constructor( private rrhhService: RrhhService ) { }

  ngOnInit(): void {

    this.obtenerExperienciaLaboral( this.regEmp.codEmpleado! );
  }

  /**
   * Procedimiento para Obtener la experiencia laboral de un empleado
   * @param codEmpleado
   */
   obtenerExperienciaLaboral(  codEmpleado: number ): void{
    this.rrhhService.obtenerExperienciaLaboral( codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.experienciaLaboral = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }

}
