import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../../../interfaces/Persona';
import { Empleado } from '../../../interfaces/Empleado';
import { lstSexo, Tipos, lstEstadoCivil, lstDocumentoExpedido } from '../../../interfaces/Tipos';
import { Pais } from '../../../interfaces/Pais';
import { Ciudad } from '../../../interfaces/Ciudad';
import { Zona } from '../../../interfaces/Zona';
import { RrhhService } from '../../services/rrhh.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() regPer !: Persona;
  @Input() regEmp !: Empleado;



  displayModal: boolean = false;

  registroPersona: Persona = {};

  lstGenero: Tipos[] = [];
  lstPais: Pais[] = [];
  lstCiudad: Ciudad[] = [];
  lstZona: Zona[] = [];
  lstEstadoCivil: Tipos[] = [];
  lstCiExpedido: Tipos[] = [];

  formDatosPersonales : FormGroup = new FormGroup({});



  constructor(
    private fb: FormBuilder,
    private rrhhService: RrhhService
  ) {
    this.lstGenero = lstSexo();
    this.obtenerPaises();
  }

  ngOnInit(): void {
    //recibiendo datos del componente padre
    this.registroPersona = { ...this.regPer }

    console.log(this.registroPersona);
    this.registroPersona.ciFechaVencimiento = new Date(this.registroPersona.ciFechaVencimiento!);
    this.registroPersona.fechaNacimiento = new Date(this.registroPersona.fechaNacimiento!);
    this.lstEstadoCivil = lstEstadoCivil();
    this.lstCiExpedido = lstDocumentoExpedido();
    this.obtenerCiudadesXPais(this.registroPersona.ciudad?.codPais!);
    this.obtenerZonaXCiudad(this.registroPersona.ciudad?.codCiudad!);

    this.formDatosPersonales = this.fb.group({
      codPersona        : [this.registroPersona.codPersona],
      nombres           : [this.registroPersona.nombres],
      apPaterno         : [this.registroPersona.apPaterno],
      apMaterno         : [this.registroPersona.apMaterno],
      sexo              : [this.registroPersona.sexo],
      nacionalidad      : [this.registroPersona.nacionalidad],
      lugarNacimiento   : [this.registroPersona.lugarNacimiento],
      ciNumero          : [this.registroPersona.ciNumero],
      ciExpedido        : [this.registroPersona.ciExpedido],
      codPais           : [this.registroPersona.ciudad?.codPais],
      codCiudad         : [this.registroPersona.ciudad?.codCiudad],
      codZona           : [this.registroPersona.codZona ],
      ciFechaVencimiento: [this.registroPersona.ciFechaVencimiento],
      fechaNacimiento   : [this.registroPersona.fechaNacimiento],
      direccion         : [this.registroPersona.direccion],
      estadoCivil       : [this.registroPersona.estadoCivil],

    });
  }


  /**
   * Procedimiento desplegar el modal
   */
  desplegarModal(): void {
    this.displayModal = true;
    this.ngOnInit();
  }

  /**
   * Cargara las ciudades al seleccionar un pais
   * @param event
   * @returns
   */
  cargarCiudades(event: any): void {

    this.registroPersona.pais!.codPais = event.value;
    if (this.registroPersona.pais?.codPais === undefined || this.registroPersona.pais?.codPais === null || this.registroPersona.pais?.codPais <= 0) return;
    this.obtenerCiudadesXPais(this.registroPersona.pais.codPais);
  }

  /**
   * Cargara las Zonas por ciudad
   * @param event
   * @returns
   */
  cargarZonas(event: any): void {
    this.registroPersona.ciudad!.codCiudad = event.value;
    if (this.registroPersona.ciudad?.codCiudad === null || this.registroPersona.ciudad?.codCiudad === undefined || this.registroPersona.ciudad?.codCiudad <= 0) return;
    this.obtenerZonaXCiudad(this.registroPersona.ciudad.codCiudad);

  }

  /**
   * Procedimiento para obtener Paises
   */
  obtenerPaises(): void {
    this.rrhhService.obtenerPaises().subscribe((resp) => {
      if (resp) {
        this.lstPais = resp;
        console.log(this.lstPais);
      }
    }, (err) => {
      this.lstPais = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener las ciudades por pais
   * @param codPais
   */
  obtenerCiudadesXPais(codPais: number): void {

    this.rrhhService.obtenerCiudadesXPais(codPais).subscribe((resp) => {
      if (resp) {
        this.lstCiudad = resp;

      }
    }, (err) => {
      this.lstCiudad = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener las zonas por ciudad
   * @param codCiudad
   */
  obtenerZonaXCiudad(codCiudad: number): void {
    this.rrhhService.obtenerZonaxCiudad(codCiudad).subscribe((resp) => {

      if (resp.length > 0) {
        this.lstZona = resp;
      }else{
        this.lstZona = [];
        this.registroPersona.codZona = 0;
      }
    }, (err) => {
      this.lstZona = [];
      console.log(err);
    });

  }

  /**
   * Procedimiento para guardar la informacion del formulario
   */
  guardar(){
    //console.log( this.formDatosPersonales.value );
    /* const  { codPersona
            ,nombres
            ,apPaterno
            ,apMaterno
            ,sexo
            ,nacionalidad
            ,lugarNacimiento
            ,ciNumero
            ,ciExpedido
            ,codPais
            ,codCiudad
            ,codZona
            ,ciFechaVencimiento
            ,fechaNacimiento
            ,direccion
            ,estadoCivil } = this.formDatosPersonales.value; */

    let a : Persona = this.formDatosPersonales.value;
    this.rrhhService.registrarInformacion(a).subscribe((resp)=>{
      if(!resp){
        console.log("Error");
      }else{
        console.log("creado");
      }
    },(err)=>{
      console.log(err);
    });



  }
}
