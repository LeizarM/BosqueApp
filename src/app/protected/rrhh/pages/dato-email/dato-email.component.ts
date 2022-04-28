import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../../interfaces/Email';
import { Empleado } from '../../../interfaces/Empleado';
import { RrhhService } from '../../services/rrhh.service';

@Component({
  selector: 'app-dato-email',
  templateUrl: './dato-email.component.html',
  styleUrls: ['./dato-email.component.css']
})
export class DatoEmailComponent  {

  @Input() regEmp!: Empleado;

  emails : Email[] = [];

  constructor( private rrhhService : RrhhService ) {

  }

  ngOnInit(): void {
    this.obtenerEmails( this.regEmp.codPersona! );
  }


  /**
   *  Procedimiento para obtener los correos de una persona
   * @param codPersona
   */
   obtenerEmails( codPersona: number ) {
    this.rrhhService.obtenerDatosEmail( codPersona ).subscribe((resp) => {
      if (resp) {
        this.emails = resp;

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
    console.log("para ver si persiste los emails  ",this.emails.length);

  }

}
