import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/auth/services/login.service';
import { Pais } from 'src/app/protected/interfaces/Pais';
import { lstDocumentoExpedido, lstEstadoCivil, lstGaranteYReferencia, lstSexo, Tipos } from 'src/app/protected/interfaces/Tipos';
import { PaisService } from 'src/app/protected/pais/services/pais.service';
import { GaranteReferencia } from '../../../interfaces/GaranteReferencia';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { Ciudad } from 'src/app/protected/interfaces/Ciudad';
import { Zona } from 'src/app/protected/interfaces/Zona';


@Component({
  selector: 'app-garante-referencia',
  templateUrl: './garante-referencia.component.html',
  styleUrls: ['./garante-referencia.component.css'],
  providers: [ MessageService ]
})
export class GaranteReferenciaComponent implements OnInit {

  //Formularios
  formDatosGaranYRef : FormGroup = new FormGroup({});

  lstGaranteReferencia : GaranteReferencia[] = [];
  lstExpedido          : Tipos[] = [];
  lstGenero            : Tipos[] = [];
  lstEstadoCivil       : Tipos[] = [];
  lstGaranteYRef       : Tipos[] = [];
  lstPais              : Pais[]  = [];
  lstCiudad            : Ciudad[] = [];
  lstZona              : Zona[] = [];


  //variables
  codEmpleado : number = 0;
  displayModal: boolean = false;

  constructor(
    private fb                     : FormBuilder,
    private fichaTrabajadorService : FichaTrabajadorService,
    private loginService           : LoginService,
    private paisService            : PaisService,
    private rrhhService            : RrhhService,
    private messageService         : MessageService,
    ) {
      this.codEmpleado =  this.loginService.codEmpleado;
      this.cargarGaranteReferencia( this.codEmpleado );

      this.lstGenero = lstSexo(); // para listar el genero
      this.lstExpedido = lstDocumentoExpedido(); // para listar en donde fue expedido un CI
      this.lstEstadoCivil =  lstEstadoCivil();  // para desplegar los estados civiles
      this.lstGaranteYRef = lstGaranteYReferencia() // pàra desplegar si una persona sera referencia o garante

      this.obtenerPaises();

    }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  /**
   * Prepara el formulario para que se pueda agregar datos
   */
  cargarFormulario(): void {
    this.formDatosGaranYRef = this.fb.group({

      nombres          : [ '', [ Validators.required, Validators.minLength(3) ] ],
      apPaterno        : [ '', [ Validators.required, Validators.minLength(3) ] ],
      apMaterno        : [ '', [ Validators.required, Validators.minLength(3) ] ],
      sexo             : [ 'M', [ Validators.required, Validators.minLength(1) ] ],
      fecNac           : [ , [ Validators.required, Validators.nullValidator ]],
      lugarNacimiento  : [ , [ Validators.required, Validators.minLength(3) ] ],
      ci               : [ , [ Validators.required, Validators.minLength(5) ] ],
      expedido         : [ , [ Validators.required, Validators.minLength(1) ] ],
      ciVenci          : [ , [ Validators.required, Validators.nullValidator ]],
      estCivil         : [ 'cas', [ Validators.required, Validators.minLength(2) ]],
      direccion        : [ , [ Validators.required, Validators.minLength(3) ]],
      zonaRe           : [ , [ Validators.required ]],
      codPais          : [ , [ Validators.required ]],
      nacionalidad     : [ 1, [ Validators.required ]],
      ciudad           : [ , [ Validators.required ]],

      direccionTrabajo : ['', [Validators.required, Validators.minLength(5)] ],
      empresaTrabajo   : ['', [Validators.required, Validators.minLength(3)] ],
      tipo             : ['ref', [Validators.required, Validators.minLength(2)] ],
      obs              : ['',]

    });
  }

  /**
   * Para cargar los garante y/o referencias por empleado
   * @param codEmpleado
   */
  cargarGaranteReferencia( codEmpleado : number): void {
    this.fichaTrabajadorService.obtenerGaranteYReferencias( codEmpleado ).subscribe((resp) => {

      if (resp) {
        this.lstGaranteReferencia = resp;
      }

    }, (err) => {
      this.lstGaranteReferencia = [];
      console.log(err);
    });
  }
  /**
   * Para prepara el formulario y desplegar el dialog
   */
  prepararFormulario():void{
    this.displayModal =  true;
  }

  /**
   * Guardara la informacion de un dependiente o garante
   */
  guardar():void{

    const { nombres, apPaterno, apMaterno, sexo, fecNac, lugarNacimiento, ci, expedido, ciVenci, direccion, zonaRe, nacionalidad, direccionTrabajo, empresaTrabajo, tipo, obs } = this.formDatosGaranYRef.value;

    const regPersona : Persona = {
      nombres,
      apPaterno,
      apMaterno,
      sexo,
      fechaNacimiento : fecNac,
      lugarNacimiento,
      ciNumero : ci,
      ciExpedido : expedido,
      ciFechaVencimiento : ciVenci,
      direccion,
      codZona : zonaRe,
      nacionalidad,
      audUsuarioI : this.loginService.codUsuario

    };

    const datoGaranteReferencia : GaranteReferencia = {
      codEmpleado : this.codEmpleado,
      direccionTrabajo,
      empresaTrabajo,
      tipo,
      observacion : obs,
      audUsuario : this.loginService.codUsuario
    };

    console.log("🚀 ~ file: garante-referencia.component.ts:126 ~ GaranteReferenciaComponent ~ guardar ~ datoPersona", regPersona);

    this.rrhhService.registrarInfoPersona(regPersona)
    .subscribe(( resp )=>{
      if( resp && resp?.ok === "ok" ){

          console.log("🚀 ~ file: garante-referencia.component.ts:142 ~ GaranteReferenciaComponent ~ guardar ~ datoGaranteReferencia", datoGaranteReferencia);
          this.registrarGaranteReferencia( datoGaranteReferencia );


        }else{
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error al Registrar la Persona', detail: resp.msg  });

        }
      },(err) => {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error al Registrar la Persona', detail: "Error al General " + err  });
      });


  }

  /**
   * Para registrar Los dependientes
   * @param tempDep
   */
  registrarGaranteReferencia(tempGarRef : GaranteReferencia): void {

    this.fichaTrabajadorService.registrarInfoGaranteReferencia( tempGarRef )
    .subscribe(( resp ) => {

      if(resp && resp?.ok === "ok"){

        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: resp.msg });
        this.displayModal = false;
        this.cargarGaranteReferencia( this.codEmpleado );

      }else{
        console.error("no se registro el garante o referencia");
      }

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
   * Cargara las ciudades por pais
   * @param event
   */
  cargarCiudades( event: number ): void {

    if(!event) return;

    this.obtenerCiudadesXPais(event);
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
   * Procedimiento para validar los campos
   * @param campo
   * @returns
   */
   esValido( campo: string ): boolean | null {
    return this.formDatosGaranYRef.controls[campo].errors && this.formDatosGaranYRef.controls[campo].touched;
  }


}
