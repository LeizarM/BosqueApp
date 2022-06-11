import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../../interfaces/Email';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';
import { LoginService } from '../../../../auth/services/login.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dato-email',
  templateUrl: './dato-email.component.html',
  styleUrls: ['./dato-email.component.css']
})
export class DatoEmailComponent  {

  @Input() regEmp !: Empleado;
  emails          : Email[] = [];
  lstEmail        : Email[] = [];
  displayModal    : boolean = false;
  //Inicializando el Formulario
  formEmail: FormGroup = this.fb.group({
    emailArr: this.fb.array([])
  });

  constructor( private rrhhService : RrhhService,
               private fb: FormBuilder,
               private login: LoginService) {

  }
  ngOnInit(): void {
    this.obtenerEmails( this.regEmp.codPersona! );

  }





  /**
   *  Procedimiento para obtener los correos de una persona
   * @param codPersona
   */
   obtenerEmails( codPersona: number ): void {
    this.rrhhService.obtenerDatosEmail( codPersona ).subscribe((resp) => {
      if (resp) {
        this.emails = resp ;
      }
    }, (err) => {
      this.emails = [];
      console.log(err);
    });
  }

  /**
   * Procedimiento para ve captura los datos de los emails
   */
  cargarEmails(){
    this.lstEmail =  [...this.emails];
    console.log(this.lstEmail);

    this.formEmail = this.fb.group({
      emailArr: this.fb.array(   this.lstEmail   )
    });

    this.displayModal = true;

  }

 lstFormEmail(): FormArray{
    return this.formEmail.get('emailArr') as FormArray;

  }

  /**
   * Para agregar nuevo registro a la lista
   */
  agregarNuevoRegistro():void{
    const nuevoEmail : Email = {
      codEmail    : 0,
      codPersona  : this.regEmp.codPersona,
      email       : '',
      audUsuario  : this.login.codUsuario
    }
    this.lstEmail.push( nuevoEmail );
  }

  /**
   * Para guadar la lista de emails
   */
   guardarEmails():void{
     console.log(this.lstEmail);
   }
}
