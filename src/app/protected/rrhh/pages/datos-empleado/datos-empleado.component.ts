import { Component, Input, OnInit } from '@angular/core';
import { Empleado } from '../../../interfaces/Empleado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RrhhService } from '../../services/rrhh.service';
import { Empresa } from '../../../interfaces/Empresa';
import { EmpresaService } from '../../../empresas/services/empresa.service';
import { Sucursal } from '../../../interfaces/Sucursal';
import { CargoSucursal } from '../../../interfaces/CargoSucursal';
import { lstEstadoActivoInactivo, lstTipoRelEmp, Tipos } from 'src/app/protected/interfaces/Tipos';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css'],

})
export class DatosEmpleadoComponent implements OnInit {

  @Input() regEmp !: Empleado;

  registroEmpleado!: Empleado;

  displayModal: boolean = false;

  formEmpleado: FormGroup = new FormGroup({});

  lstEmpresas: Empresa[] = [];
  lstSucursales: Sucursal[] = [];
  lstCargoSucursales: CargoSucursal[] = [];
  lstRelacionLaboral: Tipos[] = [];
  lstTipoRelEmp: Tipos[] = [];

  tipoUsuario         !: boolean;


  constructor(private loginService: LoginService,
    private rrhhService: RrhhService,
    private empresaService: EmpresaService,
    private fb: FormBuilder,) {

    this.obtenerEmpresas();
    this.lstRelacionLaboral = lstEstadoActivoInactivo();
    this.lstTipoRelEmp = lstTipoRelEmp();
    this.obtenerTipoUsuario();
  }

  ngOnInit(): void {
    this.registroEmpleado = this.regEmp;


    this.registroEmpleado.empleadoCargo!.fechaInicio = new Date(this.registroEmpleado.empleadoCargo?.fechaInicio!);
    this.registroEmpleado.relEmpEmpr!.fechaIni = new Date(this.registroEmpleado.relEmpEmpr?.fechaIni!);
    this.registroEmpleado.relEmpEmpr!.fechaFin = new Date(this.registroEmpleado.relEmpEmpr?.fechaFin!);


    this.obtenerSucursalesXEmpresa(this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa!);
    this.obtenerCargoXSucursal(this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal!);

    console.log(this.registroEmpleado.relEmpEmpr?.esActivo);

    this.formEmpleado = this.fb.group({
      cuentaBancaria      : [this.registroEmpleado.numCuenta],
      codEmpresa          : [this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa],
      codSucursal         : [this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal],
      codCargo            : [this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codCargo],
      apartirDe           : [this.registroEmpleado.empleadoCargo?.fechaInicio],
      relacionLaboral     : [this.registroEmpleado.relEmpEmpr?.esActivo?.toString()],
      tipoRelacion        : [this.registroEmpleado.relEmpEmpr?.tipoRel],
      fechaInicio         : [this.registroEmpleado.relEmpEmpr?.fechaIni],
      fechaFin            : [this.registroEmpleado.relEmpEmpr?.fechaFin],
      motivoFin           : [this.registroEmpleado.relEmpEmpr?.motivoFin],
      fecInicioBeneficio  : [this.registroEmpleado.relEmpEmpr?.fechaInicioBeneficio],
      fecInicioPlanilla   : [this.registroEmpleado.relEmpEmpr?.fechaInicioPlanilla],
    });

  }

  /**
   * Procedimiento para desplegar el modal
   */
  desplegarModal(): void {
    this.displayModal = true;
  }
  /**
   * Procedimiento para cambiar el valor de la empresa
   * @param
   */
  cargarSucursales(event: any): void {

    this.formEmpleado.controls['codSucursal'].setValue(0);

    this.obtenerSucursalesXEmpresa(event.value);
    this.lstCargoSucursales = [];

  }
  /**
   * Procedimiento para obtener los cargos por sucursales
   * @param event
   */
  cargarCargos(event: any): void {
    this.formEmpleado.controls['codCargo'].setValue(0);
    this.obtenerCargoXSucursal(event.value);
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
  obtenerSucursalesXEmpresa(codEmpresa: number): void {
    this.rrhhService.obtenerSucursalesXEmpresa(codEmpresa).subscribe((resp) => {
      if (resp) {
        this.lstSucursales = resp;
      }
    }, (err) => {
      console.log(err);
      this.lstSucursales = [];
    });
  }

  /**
   * Obtendra los cargos por sucursal
   * @param codSucursal
   */
  obtenerCargoXSucursal(codSucursal: number): void {
    this.rrhhService.obtenerCargoXSucursal(codSucursal).subscribe((resp) => {
      if (resp) {
        this.lstCargoSucursales = resp;
      }
    }, (err) => {
      console.log(err);
      this.lstCargoSucursales = [];
    });
  }

  /**
   * Obtendra el tipo de usuario
   */
  obtenerTipoUsuario(): boolean {

    if (this.loginService.tipoUsuario === 'ROLE_ADM'){
      return false;
    }
    return true;
  }
}
