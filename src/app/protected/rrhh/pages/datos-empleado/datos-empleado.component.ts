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
import { MessageService } from 'primeng/api';
import { RelEmplEmpr } from 'src/app/protected/interfaces/RelEmpEmpr';
import { EmpleadoCargo } from '../../../interfaces/EmpleadoCargo';

@Component({
  selector: 'app-datos-empleado',
  templateUrl: './datos-empleado.component.html',
  styleUrls: ['./datos-empleado.component.css'],
  providers: [ MessageService ]

})
export class DatosEmpleadoComponent implements OnInit {

  registroEmpleado!: Empleado;

  @Input() regEmp !: Empleado;

  displayModal: boolean = false;

  formEmpleado: FormGroup = new FormGroup({});

  lstEmpresas: Empresa[] = [];
  lstSucursales: Sucursal[] = [];
  lstCargoSucursales: CargoSucursal[] = [];
  lstRelacionLaboral: Tipos[] = [];
  lstTipoRelEmp: Tipos[] = [];

  tipoUsuario         !: boolean;


  constructor(private loginService  : LoginService,
              private rrhhService   : RrhhService,
              private empresaService: EmpresaService,
              private fb            : FormBuilder,
              private messageService: MessageService) {

    this.obtenerEmpresas();
    this.lstRelacionLaboral = lstEstadoActivoInactivo();
    this.lstTipoRelEmp = lstTipoRelEmp();
    this.obtenerTipoUsuario();
  }

  ngOnInit(): void {


    this.registroEmpleado = {...this.regEmp};


    this.registroEmpleado.empleadoCargo!.fechaInicio = new Date(this.regEmp.empleadoCargo?.fechaInicio!);
    this.registroEmpleado.relEmpEmpr!.fechaIni = new Date(this.regEmp.relEmpEmpr?.fechaIni!);
    this.registroEmpleado.relEmpEmpr!.fechaFin = new Date(this.regEmp.relEmpEmpr?.fechaFin!);


    this.obtenerSucursalesXEmpresa(this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa!);
    this.obtenerCargoXSucursal(this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal!);

    console.log(this.registroEmpleado);

    this.formEmpleado = this.fb.group({
      codEmpleado         : [ this.registroEmpleado.codEmpleado ],
      codPersona          : [ this.registroEmpleado.codPersona ],
      numCuenta           : [ this.registroEmpleado.numCuenta],
      codRelBeneficios    : [ this.registroEmpleado.codRelBeneficios],
      codRelPlanilla      : [ this.registroEmpleado.codRelPlanilla ],
      codEmpresa          : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codEmpresa],
      codSucursal         : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.sucursal?.codSucursal],
      codCargo            : [ this.registroEmpleado.empleadoCargo?.cargoSucursal?.cargo?.codCargo],
      apartirDe           : [ this.registroEmpleado.empleadoCargo?.fechaInicio],
      relacionLaboral     : [ this.registroEmpleado.relEmpEmpr?.esActivo?.toString()],
      tipoRelacion        : [ this.registroEmpleado.relEmpEmpr?.tipoRel],
      fechaInicio         : [ this.registroEmpleado.relEmpEmpr?.fechaIni],
      fechaFin            : [ this.registroEmpleado.relEmpEmpr!.fechaFin = this.registroEmpleado.relEmpEmpr?.esActivo == 0 ? this.registroEmpleado.relEmpEmpr?.fechaFin : 0  ],
      motivoFin           : [ this.registroEmpleado.relEmpEmpr?.motivoFin],
      fecInicioBeneficio  : [ this.registroEmpleado.relEmpEmpr?.fechaInicioBeneficio],
      fecInicioPlanilla   : [ this.registroEmpleado.relEmpEmpr?.fechaInicioPlanilla],
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
   * @returns true or false
   */
  obtenerTipoUsuario(): boolean {

    if (this.loginService.tipoUsuario === 'ROLE_ADM') return false;
    return true;
  }
  /**
   * Para registrar la información del empleado
   */
  guardar():void{

    //para actualizar el empleado y su informacion
    const { codEmpleado, codPersona, numCuenta, codRelBeneficios, codRelPlanilla, codEmpresa, codSucursal, codCargo, apartirDe } =  this.formEmpleado.value;

    let empleado : Empleado = {};
    empleado.codEmpleado      = codEmpleado;
    empleado.codPersona       = codPersona;
    empleado.numCuenta        = numCuenta;
    empleado.codRelBeneficios = codRelBeneficios;
    empleado.codRelPlanilla   = codRelPlanilla;

    let empleadoCargo : EmpleadoCargo = {};
    empleadoCargo.codEmpleado = codEmpleado;
    empleadoCargo.codCargoSucursal = codSucursal;
    empleadoCargo.fechaInicio = apartirDe;



    //se registra la informacion del empleado
    this.rrhhService.registrarInfoEmpleado( empleado ).subscribe((resp) => {
      if (resp?.ok === 'ok' && resp) {
        console.log("bien");
        this.displayModal =  false;


        this.messageService.add({key: 'bc', severity:'success', summary: 'Accion Realizada', detail: 'Registro Actualizado'});

      } else {
        console.log(resp);
        this.messageService.add({key: 'bc', severity:'error', summary: 'Accion Invalida', detail: "No se pudo Actualizar la información" });
      }
    }, (err) => {
      console.log("Error General");
      console.log(err);
    });

    this.rrhhService.registrarInfoEmpleadoCargo( empleadoCargo ).subscribe((resp) => {
      if (resp?.ok === 'ok' && resp) {
        console.log("bien");
        this.displayModal =  false;


        this.messageService.add({key: 'bc', severity:'success', summary: 'Accion Realizada', detail: 'Registro Actualizado'});

      } else {
        console.log(resp);
        this.messageService.add({key: 'bc', severity:'error', summary: 'Accion Invalida', detail: "No se pudo Actualizar la información" });
      }
    }, (err) => {
      console.log("Error General");
      console.log(err);
    });

    this.obtenerDatoEmpleado( codEmpleado );

  }
  /**
   * Obtendra los datos de empleado
   * @param codEmpleado
   */
  private obtenerDatoEmpleado(codEmpleado: any) {
    this.rrhhService.obtenerDetalleEmpleado(codEmpleado).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }
}
