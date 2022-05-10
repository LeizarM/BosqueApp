import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RrhhService } from '../../services/rrhh.service';
import { Empresa } from '../../../interfaces/Empresa';
import { EmpresaService } from '../../../empresas/services/empresa.service';
import { Sucursal } from '../../../interfaces/Sucursal';
import { CargoSucursal } from '../../../interfaces/CargoSucursal';

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
  lstSucursales :Sucursal[] = [];
  lstCargoSucursales : CargoSucursal[] = [];

  constructor(private rrhhService: RrhhService,
              private empresaService : EmpresaService,
              private fb: FormBuilder,) {

    this.obtenerEmpresas();

  }

  ngOnInit(): void {
    this.registroEmpleado = this.regEmp;

    this.registroEmpleado.empleadoCargo!.fechaInicio = new Date(this.registroEmpleado.empleadoCargo?.fechaInicio!);
    this.obtenerSucursalesXEmpresa( this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa! );
    this.obtenerCargoXSucursal(  this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal! );

    this.formEmpleado = this.fb.group({
      cuentaBancaria    : [ this.registroEmpleado.numCuenta ],
      codEmpresa        : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa ],
      codSucursal       : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal ],
      codCargo          : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codCargo ],
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
   cargarSucursales( event: any ):void{

    this.formEmpleado.controls['codSucursal'].setValue( event.value );
    this.obtenerSucursalesXEmpresa( event.value );
  }
  /**
   * Procedimiento para obtener los cargos por sucursales
   * @param event
   */
  cargarCargos(  event: any ) :void{
    this.formEmpleado.controls['codCargo'].setValue( event.value );
    this.obtenerCargoXSucursal( event.value );
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

  /**
   * Obtendra las sucursales por empresa
   * @param codEmpresa
   */
  obtenerSucursalesXEmpresa(  codEmpresa: number ): void{
    this.rrhhService.obtenerSucursalesXEmpresa( codEmpresa ).subscribe((resp)=>{
      if(resp){
        this.lstSucursales = resp;
      }
    },(err)=>{
      console.log(err);
      this.lstSucursales = [];
    });
  }

  /**
   * Obtendra los cargos por sucursal
   * @param codSucursal
   */
  obtenerCargoXSucursal( codSucursal : number  ):void{
    this.rrhhService.obtenerCargoXSucursal( codSucursal ).subscribe((resp)=>{
      if(resp){
        this.lstCargoSucursales = resp;
      }
    },(err)=>{
      console.log(err);
      this.lstCargoSucursales = [];
    });
  }

}
