import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RrhhService } from '../../services/rrhh.service';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css']
})
export class DatosEmpleadoComponent implements OnInit{

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

    this.registroEmpleado.empleadoCargo!.fechaInicio = new Date(this.registroEmpleado.empleadoCargo?.fechaInicio!);

    this.formEmpleado = this.fb.group({

      cuentaBancaria    : [ this.registroEmpleado.numCuenta ],
      codEmpresa        : [ this.registroEmpleado.cargo?.cargoSucursal?.sucursal?.empresa?.codEmpresa ],
      codSucursal       : [ this.registroEmpleado.cargo?.cargoSucursal?.sucursal?.codSucursal ],
      codCargo          : [ this.registroEmpleado.cargo?.codCargo ],
      apartirDe         : [ this.registroEmpleado.empleadoCargo?.fechaInicio ],
      relacionLaboral   : [ this.registroEmpleado.relEmpEmpr?.esActivo ],
      tipoRelacion      : [ this.registroEmpleado.relEmpEmpr?.tipoRel ],
      fechaInicio       : [ this.registroEmpleado.relEmpEmpr?.fechaIni ],
      fechaFin          : [ this.registroEmpleado.relEmpEmpr?.fechaFin ],
      motivoFin         : [ this.registroEmpleado.relEmpEmpr?.motivoFin ],
      fecInicioBeneficio: [ this.registroEmpleado.relEmpEmpr?.fechaInicioBeneficio ],
      fecInicioPlanilla : [ this.registroEmpleado.relEmpEmpr?.fechaInicioPlanilla ],
     });
  }

  /**
   * Procedimiento para desplegar el modal
   */
  desplegarModal(): void {
    this.displayModal = true;
  }

}
