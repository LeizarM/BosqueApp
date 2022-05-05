import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RrhhService } from '../../services/rrhh.service';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent implements  OnInit {

  @Input() regEmp !: Empleado;

  registroEmpleado!: Empleado;

  displayModal: boolean = false;

  formEmpleado: FormGroup = new FormGroup({});

  constructor(private rrhhService: RrhhService,
    private fb: FormBuilder,) {

  }

  ngOnInit(): void {
    this.registroEmpleado = this.regEmp;
    console.log("el num cuenta= ",this.registroEmpleado.numCuenta);
    this.formEmpleado = this.fb.group({

      cuentaBancaria    : [ this.registroEmpleado.numCuenta ],
      codEmpresa        : [ '' ],
      codSucursal       : [ '' ],
      codCargo          : [ '' ],
      apartirDe         : [ '' ],
      relacionLaboral   : [ '' ],
      tipoRelacion      : [ '' ],
      fechaInicio       : [ '' ],
      fechaFin          : [ '' ],
      motivo            : [ '' ],
      fecInicioBeneficio: [ '' ],
      fecInicioPlanilla : [ '' ],
     });
  }

  /**
   * Procedimiento para desplegar el modal
   */
  desplegarModal(): void {
    this.displayModal = true;
  }

}
