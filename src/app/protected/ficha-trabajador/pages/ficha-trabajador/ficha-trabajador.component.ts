import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { LoginService } from '../../../../auth/services/login.service';
import { FichaTrabajadorService } from '../../services/ficha-trabajador.service';

@Component({
  selector: 'app-ficha-trabajador',
  templateUrl: './ficha-trabajador.component.html',
  styleUrls: ['./ficha-trabajador.component.css'],
  providers: [MessageService]

})
export class FichaTrabajadorComponent implements OnInit {

  codEmpleado: number = 0;
  uploadedFiles: any[] = [];
  fotoSeleccionada !: File;
  baseUrl: string = environment.baseUrl;

  constructor(
    private messageService: MessageService,
    private loginService: LoginService,
    private fichaTrabajadorService: FichaTrabajadorService) {

    this.codEmpleado = this.loginService.codEmpleado;
  }

  ngOnInit(): void {
  }

  /**
   * Metodo para seleccionar una foto o archivo
   * @param event
   */
  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    if(this.fotoSeleccionada.type.indexOf('image') < 0){//validando que sea una imagen
      this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'El archivo seleccionado no es una imagen' });
      this.fotoSeleccionada = null!;
    }
  }

  /**
   * Metodo para subir una foto
   */
  subirFoto(): void {

    if (!this.fotoSeleccionada) {
      this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'No se selecciono ninguna imagen' });
    } else {
      this.fichaTrabajadorService.subirFoto(this.fotoSeleccionada, this.codEmpleado).subscribe((resp) => {
        console.log("La foto se subio correctamente");
        location.reload();

        setTimeout(() => {
          this.messageService.add({ key: 'bc', severity: 'success', summary: 'Accion Realizada', detail: 'Se actualizo la foto o imagen del empleado' });
        }, 5000);

      });
    }



  }


}
