import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ExperienciaLaboral } from '../../../interfaces/ExperienciaLaboral';
import { RrhhService } from '../../services/rrhh.service';
import { Empleado } from '../../../interfaces/Empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dato-experiencia-laboral',
  templateUrl: './dato-experiencia-laboral.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dato-experiencia-laboral.component.css']
})
export class DatoExperienciaLaboralComponent implements OnInit {

  @Input() regEmp !: Empleado;

  experienciaLaboral : ExperienciaLaboral[] = [];

  displayModal : boolean = false;
   //Inicializando el Formulario
   formExpLab: FormGroup = new FormGroup({});

  constructor( private rrhhService  : RrhhService,
               private fb           : FormBuilder ) {

    this.formExpLab = this.fb.group({
      codExperienciaLaboral : [ 0  ],
      codEmpleado           : [ 0 ],
      nombreEmpresa         : [ '' ],
      cargo                 : [ '' ],
      descripcion           : [ '' ],
      fechaInicio           : [ 0 ],
      fechaFin              : [ 0 ],
      nroReferencia         : [ 0 ],
      audUsuario            : [ 0 ]

      });

  }

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

  /**
   * Capturar datos para el formulario
   * @param expLab
   */
  capturarRegistro( expLab : ExperienciaLaboral) : void{

    expLab.fechaInicio  = new Date( expLab.fechaInicio!  );
    expLab.fechaFin     = new Date( expLab.fechaFin!  );

    this.formExpLab = this.fb.group({

    codExperienciaLaboral : [ expLab.codExperienciaLaboral ],
    codEmpleado           : [ expLab.codEmpleado ],
    nombreEmpresa         : [ expLab.nombreEmpresa, [ Validators.required ] ],
    cargo                 : [ expLab.cargo, [ Validators.required ] ],
    descripcion           : [ expLab.descripcion, [ Validators.required ] ],
    fechaInicio           : [ expLab.fechaInicio, [ Validators.required ] ],
    fechaFin              : [ expLab.fechaFin, [ Validators.required ] ],
    nroReferencia         : [ expLab.nroReferencia, [ Validators.required ] ],
    audUsuario            : [ expLab.audUsuario ]

    });
    this.displayModal = true; //
  }

  /**
   * procedimiento para guardar la experiencia laboral de un empleado por registro
   */
  guardarExpLab() : void{

    console.log(this.formExpLab.value);

  }

}
