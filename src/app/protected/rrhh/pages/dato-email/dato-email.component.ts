import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../../interfaces/Email';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';
import { LoginService } from '../../../../auth/services/login.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dato-email',
  templateUrl: './dato-email.component.html',
  styleUrls: ['./dato-email.component.css']
})
export class DatoEmailComponent {

  @Input() regEmp !: Empleado;
  emails: Email[] = [];
  lstEmail: Email[] = [];
  displayModal: boolean = false;
  //Inicializando el Formulario
  formEmail: FormGroup = this.fb.group({
    emailArr: this.fb.array([])
  });

  constructor(private rrhhService: RrhhService,
    private fb: FormBuilder,
    private login: LoginService) {

  }
  ngOnInit(): void {
    this.obtenerEmails(this.regEmp.codPersona!);

  }

  /**
   *  Procedimiento para obtener los correos de una persona
   * @param codPersona
   */
  obtenerEmails(codPersona: number): void {
    this.rrhhService.obtenerDatosEmail(codPersona).subscribe((resp) => {
      if (resp) {
        this.emails = resp;
      }
    }, (err) => {
      this.emails = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para  capturar los datos de los emails en el form Array
   */
  cargarEmails() {
    this.lstEmail = [...this.emails];

    this.formEmail = this.fb.group({
      emailArr: this.fb.array(
        this.lstEmail.map(e => this.preCargarFormulario(e))
      )
    });
    this.displayModal = true;

  }

  /**
   * Desplegara los datos del formulario
   * @returns
   */
  lstFormEmail(): FormArray {
    return this.formEmail.get('emailArr') as FormArray;

  }

  /**
   * Llenar Formulario
   * @param e
   * @returns
   */
  preCargarFormulario(e: Email): FormGroup {
    return new FormGroup({
      codEmail: new FormControl(e.codEmail, [Validators.required]),
      codPersona: new FormControl(e.codPersona, [Validators.required]),
      email: new FormControl(e.email, [Validators.required]),
      audUsuario: new FormControl(e.audUsuario, [Validators.required]),
    });
  }

  /**
   * Para agregar nuevo registro a la lista
   */
  agregarNuevoRegistro(): void {
    this.lstFormEmail().push( this.crearNuevoRegistro() );
  }
  /**
   * Crear nuevo registro
   * @returns
   */
  crearNuevoRegistro(): FormGroup {
    return this.fb.group({
      codEmail: new FormControl(0),
      codPersona: new FormControl(this.regEmp.codPersona!),
      email: new FormControl('', [Validators.required]),
      audUsuario: new FormControl(34)
    });
  }

  eliminarRegistro( index: number, codEmail: number ): void {

    if(codEmail === 0) {
      this.lstFormEmail().removeAt(index);

    }
    //eliminar de la base de datos

  }


  /**
   * Para guadar la lista de emails
   */
  guardarEmails(): void {


    this.lstFormEmail().controls.map(e=>{
      //console.log(e.value);
      //let { codEmail, codPersona, email, audUsuario } = e.value;
      this.rrhhService.registrarEmail(e.value).subscribe(
        (resp) => {
          if ( resp ) {
            console.log("bien");
            this.displayModal =  false;
            this.obtenerEmails( e.value.codPersona );
            //this.messageService.add({key: 'bc', severity:'success', summary: 'Accion Realizada', detail: 'Registro Actualizado'});

          } else {
            console.log(resp);
            //this.messageService.add({key: 'bc', severity:'error', summary: 'Accion Invalida', detail: "No se pudo Actualizar la información" });
          }
        }, (err) => {
          console.log("Error General");
          console.log(err);
        }
      );
    })
  }
}
