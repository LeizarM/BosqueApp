import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RrhhService } from '../../services/rrhh.service';
import { Empresa } from '../../../interfaces/Empresa';
import { EmpresaService } from '../../../empresas/services/empresa.service';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css'],

})
export class DatosEmpleadoComponent implements OnInit{

  @Input() regEmp !: Empleado;

  registroEmpleado!: Empleado;

  displayModal: boolean = false;

  formEmpleado: FormGroup = new FormGroup({});

  lstEmpresas : Empresa[] = []

  constructor(private rrhhService: RrhhService,
              private empresaService : EmpresaService,
              private fb: FormBuilder,) {

    this.obtenerEmpresas();

  }

  ngOnInit(): void {
    this.registroEmpleado = this.regEmp;

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
    this.registroEmpleado = {};
    this.ngOnInit();

  }
  /**
   * Procedimiento para cambiar el valor de la empresa
   * @param
   */
  cargarCiudades( event: any ):void{
    this.formEmpleado.controls['codEmpresa'].setValue( event.value );
  }

  /**
   * obtendra las empresas registradas
   */
  obtenerEmpresas(): void {
    this.empresaService.obtenerEmpresas().subscribe((resp) => {
      if (resp) {
        this.lstEmpresas = resp;
      }
    }, (err) => {
      this.lstEmpresas = [];
      console.log(err);
    });
  }

}
