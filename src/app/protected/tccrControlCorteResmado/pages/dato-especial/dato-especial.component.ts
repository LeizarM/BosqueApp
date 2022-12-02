import { Component, OnInit } from '@angular/core';
import { TccrControlCorteResmadoService } from '../../services/tccrControlCorteResmado.service';

@Component({
  selector: 'app-dato-especial',
  templateUrl: './dato-especial.component.html',
  styleUrls: ['./dato-especial.component.css']
})
export class DatoEspecialComponent implements OnInit {

  menu !: string;
  titulo : string = ' ** Especial ** ';
  
  constructor(
    private solDetService: TccrControlCorteResmadoService
  ) { }

  ngOnInit() {
    console.log( this.solDetService.menSolicitudEsp );
    this.menu = this.solDetService.menSolicitudEsp;
  }

  

}
