import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import maplibregl, { Marker, Popup } from 'maplibre-gl';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/auth/services/login.service';
import { Ciudad } from 'src/app/protected/interfaces/Ciudad';
import { Empleado } from 'src/app/protected/interfaces/Empleado';
import { Pais } from 'src/app/protected/interfaces/Pais';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { Zona } from 'src/app/protected/interfaces/Zona';
import { PaisService } from 'src/app/protected/pais/services/pais.service';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { Utiles } from 'src/app/protected/Utiles/Utiles';
import { Feature } from '../../../interfaces/MapBoxLibre';
import { lstDocumentoExpedido, lstEstadoCivil, lstSexo, Tipos } from '../../../interfaces/Tipos';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [ MessageService ]
})
export class DatosPersonalesComponent implements OnInit, OnDestroy {

  regEmp              : Empleado = {};

  regPer              : Persona = {};
  regPerEditar        : Persona = {};
  formDatosPersonales : FormGroup = new FormGroup({});
  isDisabled          : boolean = true;

  @ViewChild('mapR') mapR !: ElementRef; //map read
  @ViewChild('mapE') mapE !: ElementRef; //map Edit

  private markers: Marker[] = [];
  center: [number, number] = [-68.13539986925227, -16.51605372184381];


  mapa            !: maplibregl.Map;
  mapaEdit        !: maplibregl.Map;

  lstGenero           : Tipos[] = [];
  lstExpedido         : Tipos[] = [];
  lstEstadoCivil      : Tipos[] = [];
  lstPais             : Pais[]  = [];
  lstCiudad           : Ciudad[] = [];
  lstZona             : Zona[] = [];
  lugares             : Feature[] = [];

  codEmpleado : number = 0;
  displayModal : boolean = false;

  public selectedId : number = 0;

  private debounceTimer  ?: NodeJS.Timeout;


  constructor(
    private fb                     : FormBuilder,
    private messageService         : MessageService,
    private loginService           : LoginService,
    private rrhhService            : RrhhService,
    private paisService            : PaisService,
    private fichaTrabajadorService : FichaTrabajadorService
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerDetalleEmpleado( this.codEmpleado );

    this.lstGenero = lstSexo();// para listar el genero
    this.lstExpedido = lstDocumentoExpedido(); // para listar en donde fue expedido un CI
    this.lstEstadoCivil =  lstEstadoCivil();// para desplegar los estados civiles

    this.obtenerPaises();

   }

  ngOnDestroy(): void {

    this.mapa.off('move', () => { });
    this.mapa.off('load', () => { });
    this.mapa.off('dragend', () => { });

    this.mapaEdit.off('move', () => { });
    this.mapaEdit.off('load', () => { });
    this.mapaEdit.off('dragend', () => { });


  }


  ngOnInit(): void {

    this.cargarFormulario();

  }


  /**
   * Metodo para iniciarliar el formulario
   */
  cargarFormulario(): void {

    this.formDatosPersonales = this.fb.group({
      codPersona      : [ {value: '', disabled: this.isDisabled},],
      nombres         : [ {value: '', disabled: this.isDisabled},],
      apPaterno       : [ {value: '', disabled: this.isDisabled},],
      apMaterno       : [ {value: '', disabled: this.isDisabled},],
      sexo            : [ {value: '', disabled: this.isDisabled},],
      fecNac          : [ {value: '', disabled: this.isDisabled},],
      lugarNacimiento : [ {value: 0, disabled: this.isDisabled},],
      ci              : [ {value: '', disabled: this.isDisabled},],
      expedido        : [ {value: '', disabled: this.isDisabled},],
      ciVenci         : [ {value: 0, disabled: this.isDisabled},],
      estCivil        : [ ],
      direccion       : [ ],
      zonaRe          : [ ],
      lat             : [ ],
      lng             : [ ],

      codPais         : [ ],
      nacionalidad    : [ {value: 0, disabled: this.isDisabled}],
      ciudad          : [ ],
    });
  }





  /**
   * Para desplegar el mapa y cargar datos
   * @param lat
   * @param lng
   */
  mapaLectura(lat: number, lng: number): void {
    this.mapa = new maplibregl.Map({
      container: this.mapR.nativeElement,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: [lat, lng],
      zoom: 16,
    });

    // Agregando marcador
    new maplibregl.Marker().setLngLat([lat, lng]).addTo(this.mapa);
  }

  /**
   * Procedimiento para obtener informacion del empleado
   */
   obtenerDetalleEmpleado( codEmpleado : number ): void {

    this.rrhhService.obtenerDetalleEmpleado( codEmpleado ).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;

        if(this.regEmp.codPersona){
          this.obtenerDatosPersonales( this.regEmp.codPersona );
        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  /**
   * Procedimiento para obtener los datos persºonales del empleado
   * @param codPersona
   */
   obtenerDatosPersonales(codPersona: number) {
    this.rrhhService.obtenerDatosPersonales(codPersona).subscribe((resp) => {
      if (resp) {
        this.regPer = resp;
        this.mapaLectura(this.regPer.lat!, this.regPer.lng!);

      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Para cargar los datos personales de una persona
   */
  cargarInformacionPersonal():void{
    this.displayModal = true;
    this.regPerEditar = {...this.regPer };

    //Convirtiendo de TS a PrimeNG las fechas
    this.regPerEditar.fechaNacimiento    = new Utiles().fechaTStoPrimeNG( this.regPerEditar.fechaNacimiento! );
    this.regPerEditar.ciFechaVencimiento = new Utiles().fechaTStoPrimeNG( this.regPerEditar.ciFechaVencimiento! );

    // limpiando el input de busqueda
    this.lugares = [];

    //cargando los combo
    this.obtenerCiudadesXPais( this.regPerEditar.ciudad?.codPais! );
    this.obtenerZonaXCiudad( this.regPerEditar.ciudad?.codCiudad! );


    //Inicializando el Formulario con valores predeterminados

    this.formDatosPersonales = this.fb.group({

      codPersona      : [ this.regPerEditar.codPersona],
      nombres         : [ this.regPerEditar.nombres ],
      apPaterno       : [ this.regPerEditar.apPaterno ],
      apMaterno       : [ this.regPerEditar.apMaterno ],
      sexo            : [ this.regPerEditar.sexo ],
      fecNac          : [ this.regPerEditar.fechaNacimiento ],
      lugarNacimiento : [ this.regPerEditar.lugarNacimiento ],
      ci              : [ this.regPerEditar.ciNumero ],
      expedido        : [ this.regPerEditar.ciExpedido ],
      ciVenci         : [ this.regPerEditar.ciFechaVencimiento ],
      estCivil        : [ this.regPerEditar.estadoCivil ],
      direccion       : [ this.regPerEditar.direccion ],
      zonaRe          : [ this.regPerEditar.codZona ],
      lat             : [ this.regPerEditar.lat ],
      lng             : [ this.regPerEditar.lng ],


      codPais         : [ this.regPerEditar.ciudad?.codPais],
      nacionalidad    : [ this.regPerEditar.nacionalidad ],
      ciudad          : [ this.regPerEditar.ciudad?.codCiudad ]

    });


    this.center = [this.regPerEditar.lat!, this.regPerEditar.lng!];

    this.mapaEdit = new maplibregl.Map({
      container: this.mapE.nativeElement,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
      center: this.center,
      zoom: 18,

    });

    this.mapaEdit.once('load', () => {
      this.mapaEdit.resize();
    })

    this.mapaEdit.on('move', (event) => {
      const { lat, lng, } = event.target.getCenter();
      this.center = [lat, lng];
    });

    // Agregando marcador para editar
    const markEdit = new maplibregl.Marker(
      {
        draggable: true,
      }
    ).setLngLat(this.center).addTo(this.mapaEdit);

    markEdit.on('dragend', (ev) => {
      const { lng, lat } = ev.target._lngLat;
      // Se invierten la latitud y longitud
      this.formDatosPersonales.controls['lng'].setValue(lat);
      this.formDatosPersonales.controls['lat'].setValue(lng);
    });


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
   obtenerCiudadesXPais( codPais: number ): void {

    this.rrhhService.obtenerCiudadesXPais(codPais).subscribe((resp) => {
      if (resp) {
        this.lstCiudad = resp;
        this.lstZona = [];
      }
    }, (err) => {
      this.lstCiudad = [];
      console.log(err);
    });
  }
  /**
   * Cargara las ciudades por pais
   * @param event
   */
   cargarCiudades( event: number ): void {

    if(!event) return;

    this.obtenerCiudadesXPais(event);
  }

  /**
   * Cargara las zonas por ciudad
   * @param event
   * @returns
   */
  cargarZonas(event: number): void {

    if(!event )return;

    this.obtenerZonaXCiudad( event );

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
        }
      }, (err) => {
        this.lstZona = [];
        console.log(err);
      });

    }

    /**
     * Guardara la informacion
     */
    guardar():void{

      const {codPersona, nombres, apPaterno, apMaterno, sexo, fecNac, lugarNacimiento, ci, expedido, ciVenci, estCivil, direccion, zonaRe, nacionalidad, lat, lng } = this.formDatosPersonales.value;

      const regPersona : Persona = {
        codPersona,
        nombres,
        apPaterno,
        apMaterno,
        sexo,
        fechaNacimiento : fecNac,
        lugarNacimiento,
        ciNumero : ci,
        ciExpedido : expedido,
        ciFechaVencimiento : ciVenci,
        estadoCivil : estCivil,
        direccion,
        codZona : zonaRe,
        nacionalidad,
        lat,
        lng

      }

      this.rrhhService.registrarInfoPersona(regPersona).subscribe(( resp )=>{

        if(resp && resp?.ok === "ok"){

          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: resp.msg });
          this.displayModal = false;

        }else{
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error al Actualizar', detail: resp.msg  });

        }
      },(err) => {
        console.log("Error General...");
        console.log(err);
      });

      // Actualizamos la lista
      this.obtenerDetalleEmpleado( this.codEmpleado );

      this.mapaEdit.off('load', () => { });
      this.mapaEdit.off('dragend', () => { });
      this.mapaEdit.off('move', () => { });

    }

    /**
     * para hacer zoom al mapa
     */
    zoomIn():void{
      this.mapa.zoomIn();
    }
    /**
     * Para alejar el zoom al mapa
     */
    zoomOut():void{
      this.mapa.zoomOut();
    }

    /**
     * Para obtener lugares en el mapa de acuerdo al query
     * @param query
     */
    onQueryChange( query : string = '' ): void{

      if(this.debounceTimer) clearTimeout(this.debounceTimer);

      this.debounceTimer = setTimeout(() => {

        this.fichaTrabajadorService.obtenerLugares( query ).subscribe((resp)=>{
            if(resp.features.length > 0){

              this.lugares = resp.features;
              console.log(this.lugares);
              this.crearMarcadoresDeLugares(this.lugares);
            }else{
              this.lugares = [];
            }
        });

      }, 1000);

    }
    /**
     * Para ir a la ubicacion
     * @param lugar
     */
    flyTo(lugar : Feature){
      this.selectedId = lugar.properties.place_id;
      console.log(this.selectedId);
      this.mapaEdit.flyTo({
        center :[
                  lugar.bbox[0] + ( lugar.bbox[2] - lugar.bbox[0] ) / 2,
                  lugar.bbox[1] + ( lugar.bbox[3] - lugar.bbox[1] ) / 2
                ]
      });
    }

    /**
     * Se crean marcadores de acuerdo
     * @param lugares
     * @returns
     */
    crearMarcadoresDeLugares(lugares : Feature[]): void {

      if(!this.mapaEdit) throw Error("Mapa no encontrado");
      this.markers.forEach(marker => marker.remove());
      const newMarkers = [];
      for( const lugar of this.lugares ){
        let center = [
                      lugar.bbox[0] + (lugar.bbox[2] - lugar.bbox[0]) / 2,
                      lugar.bbox[1] +(lugar.bbox[3] - lugar.bbox[1]) / 2
                      ];
        const [lng, lat] = center;
        const popup = new Popup().setHTML(
          `
          <h6>${ lugar.properties.display_name }</h6>
          `
        );
        const newMarker = new Marker(
          {
            color: '#FF0000'
          }
        )
        .setLngLat([lng,lat])
        .setPopup( popup )
        .addTo(this.mapaEdit);

        newMarkers.push( newMarker );

      }
      this.markers = newMarkers;

      if(lugares.length === 0) return; // si no existen resultados de lugares, hasta aqui se detiene

      //ajustamos el mapa hacia los resultados de los marcadores
      const bounds = new maplibregl.LngLatBounds();

      newMarkers.forEach(marker => bounds.extend( marker.getLngLat() )); //iteramos los marcadores
      const [lat, lng] = this.center
      bounds.extend([lng, lat]);
      // agregando tambien la ubicacion actual de la persona

      this.mapaEdit.fitBounds( bounds,{ //re ajustando el mapa para que encierre a todos los marcadores, incluyendo la ubicacion del empleado
                                        padding: 100,
                                      },  );
    }
}
