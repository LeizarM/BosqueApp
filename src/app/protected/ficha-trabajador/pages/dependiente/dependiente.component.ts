import { Component, OnInit } from '@angular/core';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';
import { Dependiente } from '../../../interfaces/Dependiente';
import { LoginService } from 'src/app/auth/services/login.service';
import { Persona } from 'src/app/protected/interfaces/Persona';
import { RrhhService } from '../../../rrhh/services/rrhh.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lstDocumentoExpedido, lstEstadoCivil, lstSexo, lstTipoDependientes, Tipos } from 'src/app/protected/interfaces/Tipos';
import { Pais } from 'src/app/protected/interfaces/Pais';
import { Ciudad } from 'src/app/protected/interfaces/Ciudad';
import { Zona } from 'src/app/protected/interfaces/Zona';
import { PaisService } from 'src/app/protected/pais/services/pais.service';
import { MessageService } from 'primeng/api';
import { finalize, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-dependiente',
  templateUrl: './dependiente.component.html',
  styleUrls: ['./dependiente.component.css'],
  providers: [ MessageService ]
})
export class DependienteComponent implements OnInit {

  //Formularios
  formDatosDependiente : FormGroup = new FormGroup({});

  //Listas
  lstDependientes     : Dependiente[] = [];
  lstGenero           : Tipos[] = [];
  lstExpedido         : Tipos[] = [];
  lstEstadoCivil      : Tipos[] = [];
  lstPais             : Pais[]  = [];
  lstCiudad           : Ciudad[] = [];
  lstZona             : Zona[] = [];
  lstTipoDependientes : Tipos[] = [];

  //Objetos
  datoPersonaDep  : Persona = {};
  datoDependiente : Dependiente = {};

  //variables
  codEmpleado     : number = 0;
  displayModal   : boolean = false;


  constructor(
    private fb                     : FormBuilder,
    private rrhhService            : RrhhService,
    private fichaTrabajadorService : FichaTrabajadorService,
    private loginService           : LoginService,
    private paisService            : PaisService,
    private messageService         : MessageService,
  ) {

    this.codEmpleado = this.loginService.codEmpleado;
    this.cargarListaDependientes( this.codEmpleado );

    this.lstGenero = lstSexo(); // para listar el genero
    this.lstExpedido = lstDocumentoExpedido(); // para listar en donde fue expedido un CI
    this.lstEstadoCivil =  lstEstadoCivil();  // para desplegar los estados civiles
    this.lstTipoDependientes = lstTipoDependientes(); // para desplegar los tipos de dependientes para el registro de un dependientes

    this.obtenerPaises();


  }

  ngOnInit(): void {

    this.cargarFormulario();
  }


  /**
   * Metodo para iniciarliar el formulario
   */
   cargarFormulario(): void {

    this.formDatosDependiente = this.fb.group({

      nombres         : [ , [ Validators.required, Validators.minLength(3) ] ],
      apPaterno       : [ , [ Validators.required, Validators.minLength(3) ] ],
      apMaterno       : [ , [ Validators.required, Validators.minLength(3) ] ],
      sexo            : [ , [ Validators.required, Validators.minLength(1) ] ],
      fecNac          : [ , [ Validators.required, Validators.nullValidator ]],
      lugarNacimiento : [ , [ Validators.required, Validators.minLength(3) ] ],
      ci              : [ , [ Validators.required, Validators.minLength(5) ] ],
      expedido        : [ , [ Validators.required, Validators.minLength(1) ] ],
      ciVenci         : [ , [ Validators.required, Validators.nullValidator ]],
      estCivil        : [ , [ Validators.required, Validators.minLength(2) ]],
      direccion       : [ , [ Validators.required, Validators.minLength(3) ]],
      zonaRe          : [ , [ Validators.required ]],
      codPais         : [ , [ Validators.required ]],
      nacionalidad    : [ , [ Validators.required ]],
      ciudad          : [ , [ Validators.required ]],
      parentesco      : [ , [ Validators.required ]],

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
    * Procedimiento para obtener dependientes por Empleado
    * @param codEmpleado
    */
  cargarListaDependientes( codEmpleado : number): void {
    this.fichaTrabajadorService.obtenerDependientes(codEmpleado).subscribe((resp) => {

      if (resp) {
        this.lstDependientes = resp;
        console.log(this.lstDependientes);
      }

    }, (err) => {
      this.lstDependientes = [];
      console.log(err);
    });
  }

  /**
   * Cargara los datos de un dependiente
   * @param codPersona
   */
  cargarDatosDependiente( ) : void {

    this.displayModal = true;

  }
  /**
   * Procedimiento
   * @param codPersona
   */
  obtenerDatosPersonales( codPersona: number ) {
    this.rrhhService.obtenerDatosPersonales(codPersona).subscribe((resp) => {
      if (resp) {
        this.datoPersonaDep = resp;
      }
    }, (err) => {
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
   * Para guardar la informacion
   */
  guardar(){

    const {codPersona, nombres, apPaterno, apMaterno, sexo, fecNac, lugarNacimiento, ci, expedido, ciVenci, estCivil, direccion, zonaRe, nacionalidad, parentesco } = this.formDatosDependiente.value;

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
        audUsuarioI : this.loginService.codUsuario,

      }

      this.rrhhService.registrarInfoPersona(regPersona)
      .pipe(

       )
      .subscribe(( resp )=>{
        if(resp && resp?.ok === "ok"){

          //this.obtenerUltimoCodPersona();

          console.log("el codPersona es= ",this.datoDependiente.codPersona);
          const tempDep : Dependiente = {
            codPersona : this.datoDependiente.codPersona,
            codEmpleado : this.codEmpleado,
            parentesco,
            esActivo : 'SI',// por defecto es activo
            audUsuario : regPersona.audUsuarioI
          };

          this.registrarDependiente( tempDep );


        }else{
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error al Registrar la Persona', detail: resp.msg  });

        }
      },(err) => {
        console.log("Error General...");
        console.log(err);
      });

      this.cargarListaDependientes( this.codEmpleado );

  };

  obtenerUltimoCodPersona() : void{
    this.rrhhService.obtenerUltimoCodigoPersona()
    .subscribe((resp)=>{
      if( resp && resp.codPersona ){
         this.datoPersonaDep.codPersona = resp.codPersona;
         console.log("🚀 ~ file: dependiente.component.ts:281 ~ DependienteComponent ~ this.rrhhService.obtenerUltimoCodigoPersona ~ this.datoPersonaDep.codPersona", this.datoPersonaDep.codPersona)

      }else{
         this.datoPersonaDep.codPersona = 0;
      }
    });

  }

  /**
   * Para registrar Los dependientes
   * @param tempDep
   */
   registrarDependiente(tempDep : Dependiente): void {

    this.fichaTrabajadorService.registrarInfoPersona( tempDep )
    .pipe(
      ( finalize(() => this.obtenerUltimoCodPersona ) )
    )
    .subscribe(( resp ) => {

      if(resp && resp?.ok === "ok"){
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: resp.msg });
        this.displayModal = false;
      }else{
        console.error("no se registro el dependiente");
      }

    });


  }

}
