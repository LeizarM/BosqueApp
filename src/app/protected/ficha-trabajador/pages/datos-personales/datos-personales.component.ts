
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/protected/interfaces/Ciudad';
import { Empleado } from 'src/app/protected/interfaces/Empleado';
import { LoginService } from 'src/app/auth/services/login.service';
import { lstDocumentoExpedido, lstEstadoCivil, lstSexo, Tipos } from '../../../interfaces/Tipos';
import { MessageService } from 'primeng/api';
import { Pais } from 'src/app/protected/interfaces/Pais';
import { PaisService } from 'src/app/protected/pais/services/pais.service';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { Utiles } from 'src/app/protected/Utiles/Utiles';
import { Zona } from 'src/app/protected/interfaces/Zona';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css'],
  providers: [ MessageService ]
})
export class DatosPersonalesComponent implements OnInit {

  regEmp              : Empleado = {};
  regPer              : Persona = {};
  regPerEditar        : Persona = {};
  formDatosPersonales : FormGroup = new FormGroup({});

  lstGenero           : Tipos[] = [];
  lstExpedido         : Tipos[] = [];
  lstEstadoCivil      : Tipos[] = [];
  lstPais             : Pais[]  = [];
  lstCiudad           : Ciudad[] = [];
  lstZona             : Zona[] = [];

  codEmpleado : number = 0;
  displayModal : boolean = false;

  constructor(
    private fb            : FormBuilder,
    private messageService: MessageService,
    private loginService  : LoginService,
    private rrhhService   : RrhhService,
    private paisService   : PaisService
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerDetalleEmpleado( this.codEmpleado );

    this.lstGenero = lstSexo();// para listar el genero
    this.lstExpedido = lstDocumentoExpedido(); // para listar en donde fue expedido un CI
    this.lstEstadoCivil =  lstEstadoCivil();// para desplegar los estados civiles

    this.obtenerPaises();



   }

  ngOnInit(): void {

    this.cargarFormulario();


  }

  /**
   * Metodo para iniciarliar el formulario
   */
  cargarFormulario(): void {

    this.formDatosPersonales = this.fb.group({
      codPersona      : [ ],
      nombres         : [ ],
      apPaterno       : [ ],
      apMaterno       : [ ],
      sexo            : [ ],
      fecNac          : [ ],
      lugarNacimiento : [ ],
      ci              : [ ],
      expedido        : [ ],
      ciVenci         : [ ],
      estCivil        : [ ],
      direccion       : [ ],
      zonaRe          : [ ],

      codPais         : [ ],
      nacionalidad    : [ ],
      ciudad          : [ ],
    });
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

      codPais         : [ this.regPerEditar.ciudad?.codPais],
      nacionalidad    : [ this.regPerEditar.nacionalidad ],
      ciudad          : [ this.regPerEditar.ciudad?.codCiudad ]

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

      const {codPersona, nombres, apPaterno, apMaterno, sexo, fecNac, lugarNacimiento, ci, expedido, ciVenci, estCivil, direccion, zonaRe, nacionalidad } = this.formDatosPersonales.value;

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
        nacionalidad

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

    }

}
