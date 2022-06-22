import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Persona } from '../../../interfaces/Persona';
import { Empleado } from '../../../interfaces/Empleado';
import { lstSexo, Tipos, lstEstadoCivil, lstDocumentoExpedido } from '../../../interfaces/Tipos';
import { Pais } from '../../../interfaces/Pais';
import { Ciudad } from '../../../interfaces/Ciudad';
import { Zona } from '../../../interfaces/Zona';
import { RrhhService } from '../../services/rrhh.service';
import { MessageService } from 'primeng/api';
import { PaisService } from '../../../pais/services/pais.service';
import maplibregl, { MapLibreZoomEvent } from 'maplibre-gl';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [MessageService]

})
export class DatosPersonalesComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() regPer !: Persona;
  @Input() regEmp !: Empleado;

  @ViewChild('mapR') mapR !: ElementRef;
  mapa            !: maplibregl.Map;
  center: [number, number ] = [ -68.13539986925227, -16.51605372184381 ];

  displayModal    : boolean = false;

  registroPersona : Persona = {};

  lstGenero       : Tipos[] = [];
  lstPais         : Pais[] = [];
  lstCiudad       : Ciudad[] = [];
  lstZona         : Zona[] = [];
  lstEstadoCivil  : Tipos[] = [];
  lstCiExpedido   : Tipos[] = [];

  formDatosPersonales: FormGroup = new FormGroup({});



  constructor(
    private fb: FormBuilder,
    private rrhhService: RrhhService,
    private paisService: PaisService,
    private messageService: MessageService
  ) {
    this.lstGenero = lstSexo();
    this.obtenerPaises();
    this.lstEstadoCivil = lstEstadoCivil();
    this.lstCiExpedido = lstDocumentoExpedido();
  }

  ngOnDestroy(): void {
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
   this.mapa = new maplibregl.Map({
      container: this.mapR.nativeElement,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: this.center,
      zoom: 18,
    });

    this.mapa.on('move', (event) => {
      const { lng, lat } =   event.target.getCenter();
      this.center = [lng, lat];
    });

    new maplibregl.Marker().setLngLat(this.center).addTo(this.mapa);
  }

  ngOnInit(): void {

    //recibiendo datos del componente padre
    this.registroPersona = { ...this.regPer }
    this.obtenerDatosPersonales(this.regEmp.codPersona!);

    this.registroPersona.ciFechaVencimiento = new Date(this.registroPersona.ciFechaVencimiento?.toString()!);
    this.registroPersona.ciFechaVencimiento!.setDate(this.registroPersona.ciFechaVencimiento!.getDate() + 1);
    this.registroPersona.fechaNacimiento = new Date(this.registroPersona.fechaNacimiento?.toString()!);
    this.registroPersona.fechaNacimiento!.setDate(this.registroPersona.fechaNacimiento!.getDate() + 1);




    this.obtenerCiudadesXPais(this.registroPersona.ciudad?.codPais!);
    this.obtenerZonaXCiudad(this.registroPersona.ciudad?.codCiudad!);

    this.formDatosPersonales = this.fb.group({

      codPersona          : [this.registroPersona.codPersona],
      nombres             : [this.registroPersona.nombres],
      apPaterno           : [this.registroPersona.apPaterno],
      apMaterno           : [this.registroPersona.apMaterno],
      sexo                : [this.registroPersona.sexo],
      nacionalidad        : [this.registroPersona.nacionalidad],
      lugarNacimiento     : [this.registroPersona.lugarNacimiento],
      ciNumero            : [this.registroPersona.ciNumero],
      ciExpedido          : [this.registroPersona.ciExpedido],
      codPais             : [this.registroPersona.ciudad?.codPais],
      codCiudad           : [this.registroPersona.ciudad?.codCiudad],
      codZona             : [this.registroPersona.codZona],
      ciFechaVencimiento  : [this.registroPersona.ciFechaVencimiento],
      fechaNacimiento     : [this.registroPersona.fechaNacimiento],
      direccion           : [this.registroPersona.direccion],
      estadoCivil         : [this.registroPersona.estadoCivil],

    });


  }

  /**
   * Procedimiento para obtener los datos personales del empleado
   * @param codPersona
   */
  obtenerDatosPersonales(codPersona: number) {
    this.rrhhService.obtenerDatosPersonales(codPersona).subscribe((resp) => {
      if (resp) {
        this.regPer = resp;
      }
    }, (err) => {
      console.log(err);
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
    this.paisService.obtenerPaises().subscribe((resp) => {
      if (resp) {
        this.lstPais = resp;
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
      } else {
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
  guardar(): void {

    const persona: Persona = this.formDatosPersonales.value;

    this.rrhhService.registrarInfoPersona(persona).subscribe((resp) => {

      if (resp?.ok === 'ok' && resp) {
        console.log("bien");
        this.displayModal = false;
        this.obtenerDatosPersonales(persona.codPersona!);
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: 'Registro Actualizado' });

      } else {
        console.log(resp);
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Accion Invalida', detail: "No se pudo Actualizar la información" });
      }
    }, (err) => {
      console.log("Error General");
      console.log(err);
    });

  }


  zoomIn() : void{
    this.mapa.zoomIn();

  }

  zoomOut() : void{
    this.mapa.zoomOut();
  }
}
