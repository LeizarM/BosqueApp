import { Component, Input, OnInit } from '@angular/core';
import { Persona } from '../../../interfaces/Persona';
import { Empleado } from '../../../interfaces/Empleado';
import { lstSexo, Tipos, lstEstadoCivil, lstDocumentoExpedido } from '../../../interfaces/Tipos';
import { Pais } from '../../../interfaces/Pais';
import { Ciudad } from '../../../interfaces/Ciudad';
import { Zona } from '../../../interfaces/Zona';
import { RrhhService } from '../../services/rrhh.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  @Input() regPer !: Persona;
  @Input() regEmp !: Empleado;



  displayModal: boolean = false;

  registroPersona : Persona = {};

  lstGenero      : Tipos[] = [];
  lstPais        : Pais[] = [];
  lstCiudad      : Ciudad[] = [];
  lstZona        : Zona[] = [];
  lstEstadoCivil : Tipos[] = [];
  lstCiExpedido  : Tipos[]= [];

  constructor(
    private rrhhService : RrhhService
  ) {
    this.lstGenero = lstSexo();
    this.obtenerPaises();

  }

  ngOnInit(): void {
    //recibiendo datos del componente padre
    this.registroPersona = { ...this.regPer }

    console.log(this.registroPersona);
    this.regPer.ciFechaVencimiento = new Date(this.regPer.ciFechaVencimiento!);
    this.regPer.fechaNacimiento = new Date(this.regPer.fechaNacimiento!);
    this.lstEstadoCivil = lstEstadoCivil();
    this.lstCiExpedido =  lstDocumentoExpedido();
    this.obtenerCiudadesXPais( this.registroPersona.ciudad?.codPais! );
    this.obtenerZonaXCiudad( this.registroPersona.ciudad?.codCiudad! );

  }


  /**
   * Procedimiento para capturar los datos de la persona y desplegar el modal
   */
  cargarDatosPersona(): void{
    this.displayModal = true;
  }

  /**
   * Cargara las ciudades al seleccionar un pais
   * @param event
   * @returns
   */
  cargarCiudades(event: any ):void{

    this.regPer.pais!.codPais = event.value;
    if(this.regPer.pais?.codPais === undefined || this.regPer.pais?.codPais === null || this.regPer.pais?.codPais <= 0) return;
    this.obtenerCiudadesXPais( this.regPer.pais.codPais );
  }

  /**
   * Cargara las Zonas por ciudad
   * @param event
   * @returns
   */
  cargarZonas( event: any ):void{
    this.regPer.ciudad!.codCiudad = event.value;
    if( this.regPer.ciudad?.codCiudad === null || this.regPer.ciudad?.codCiudad === undefined || this.regPer.ciudad?.codCiudad <= 0 ) return;
    this.obtenerZonaXCiudad(this.regPer.ciudad.codCiudad );

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
  obtenerCiudadesXPais( codPais : number ): void{
    console.log("el codPais es= "+codPais);
    this.rrhhService.obtenerCiudadesXPais( codPais ).subscribe((resp) => {
      if(resp){
        this.lstCiudad = resp;

      }
    },(err)=>{
      this.lstCiudad = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para obtener las zonas por ciudad
   * @param codCiudad
   */
  obtenerZonaXCiudad(  codCiudad: number ):void{
    this.rrhhService.obtenerZonaxCiudad( codCiudad ).subscribe((resp)=>{
      if(resp){
        this.lstZona = resp;

      }
    },(err)=>{
      this.lstZona = [];
      console.log(err);
    });

  }
}
