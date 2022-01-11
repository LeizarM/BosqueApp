import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { VistaService } from '../../services/vista.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items: MenuItem[] = [];
  hayError: boolean = false;
  constructor(
    private vistaService: VistaService
  ) { }

  ngOnInit(): void {
    this.obtenerMenuXUsuario(2);
  }
  /**
   * Procedimiento para obtener el menu dinamico por usuario
   * @param codUsuario
   */
  obtenerMenuXUsuario(codUsuario: number): void {
    console.log("entro en obtenerMenuXUsuario");

    this.hayError = false;

    this.vistaService.obtenerMenuDinamico(34).subscribe((items) => {
      this.items = items;
      console.log(this.items);
    }, (err) => {
      console.error(err);
      this.hayError = true;
      this.items = [];
    });
    //return this.items;
  }



}
