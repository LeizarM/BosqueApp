import { Component, OnInit } from '@angular/core';
import { Autorizacion } from '../../interface/Autorizacion';
import { PreciosService } from '../../services/precios.service';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css']
})
export class AutorizacionComponent implements OnInit {

  autorizaciones!: Autorizacion[];

  constructor( private autorizacion: PreciosService ) {
    this.obtenerListaPropuesta();
   }

  ngOnInit(): void {
  }

  obtenerListaPropuesta(){

    this.autorizacion.obtenerListAutorizacion().subscribe( (resp) =>{
      console.log(resp);
        this.autorizaciones = resp;
    },( err ) =>{
      console.log(err);

    });
  }

}
