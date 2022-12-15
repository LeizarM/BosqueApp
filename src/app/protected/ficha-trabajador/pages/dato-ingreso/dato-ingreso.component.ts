import { Component, OnInit } from '@angular/core';
import { RrhhService } from 'src/app/protected/rrhh/services/rrhh.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Empleado } from 'src/app/protected/interfaces/Empleado';

@Component({
  selector: 'app-dato-ingreso',
  templateUrl: './dato-ingreso.component.html',
  styleUrls: ['./dato-ingreso.component.css']
})
export class DatoIngresoComponent implements OnInit {

  // objectos
  regEmp : Empleado = {};

  //variables
  codEmpleado : number = 0;

  constructor(
    private rrhhService   : RrhhService,
    private loginService  : LoginService,
  )
  {
    this.codEmpleado = this.loginService.codEmpleado;
    this.obtenerDatoEmpleado( this.codEmpleado );
  }

  ngOnInit(): void {
  }


  /**
   * Obtendra los datos de empleado
   * @param codEmpleado
   */
  obtenerDatoEmpleado(codEmpleado: number) {
    this.rrhhService.obtenerDetalleEmpleado(codEmpleado).subscribe((resp) => {
      if (resp) {
        this.regEmp = resp;
        console.log(this.regEmp);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
