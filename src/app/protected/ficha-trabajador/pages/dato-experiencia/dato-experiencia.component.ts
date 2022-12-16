import { Component, OnInit } from '@angular/core';
import { ExperienciaLaboral } from 'src/app/protected/interfaces/ExperienciaLaboral';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-dato-experiencia',
  templateUrl: './dato-experiencia.component.html',
  styleUrls: ['./dato-experiencia.component.css']
})
export class DatoExperienciaComponent implements OnInit {

  //Variables
  codEmpleado : number = 0;

  //Listas
  lstExperienciaLaboral : ExperienciaLaboral[] = [];

  constructor(
    private rrhhService  : RrhhService,
    private loginService : LoginService
  ) {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerExperienciaLaboral( this.codEmpleado );
  }

  ngOnInit(): void {
  }


  /**
   * Procedimiento para Obtener la experiencia laboral de un empleado
   * @param codEmpleado
   */
  obtenerExperienciaLaboral(codEmpleado: number): void {
    this.rrhhService.obtenerExperienciaLaboral(codEmpleado).subscribe((resp) => {
      if (resp) {
        this.lstExperienciaLaboral = resp;
      }
    }, (err) => {
      console.log(err);
    });
  }
}
