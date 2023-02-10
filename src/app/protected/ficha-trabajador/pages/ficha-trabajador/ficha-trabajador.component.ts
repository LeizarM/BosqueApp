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
      this.fichaTrabajadorService.subirFoto(this.fotoSeleccionada, this.codEmpleado).subscribe(() => {

        location.reload();

      });
    }

  }

   /**
    * Procedimiento para cargar y descargar la ficha del trabajador
    */
   descargarFichaTrabajador() : void{

    console.log("el cod empleado es ", this.codEmpleado );

    this.fichaTrabajadorService.descargarFicha(this.codEmpleado).subscribe((resp)=>{


      console.log(resp);

      let url = window.URL.createObjectURL(resp.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = resp.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.log(error);
    });

  }
}
