import { Component, OnInit , ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

import { CcrSolicitudDetalle } from 'src/app/protected/interfaces/CcrSolicitudDetalle';
import { TccrControlCorteResmadoService } from '../../services/tccrControlCorteResmado.service';


@Component({
  selector: 'app-solicitudCorte',
  templateUrl: './solicitudCorte.component.html',
  styleUrls: ['./solicitudCorte.component.css']
})
export class SolicitudCorteComponent implements OnInit {

  @ViewChild('dtListBase') dtListBase!: Table;
  lsSolicDetalles : CcrSolicitudDetalle[] = [];
  titulo: string =' es el titutlo ';
  displayBasic: boolean = false;
  menu !: string;

  constructor( private solDetService: TccrControlCorteResmadoService,   private router : Router
    ) {
      this.titulo=' opcion constuctor';
      this.lsSolicDetalles = [];
      console.log('Ingreso al constructor buscando listado inicial , se limpio el listado ahora de tamañio = '+this.lsSolicDetalles.length );
  }


  ngOnInit(): void {
    this.listaInicial();
    console.log('Ingreso al constructor buscando listado inicial , se limpio el listado ahora de tamañio = '+this.lsSolicDetalles.length );
    this.titulo = ' Estoy en iniciando , con cant de registro = ' + this.lsSolicDetalles.length ;
    this.menu = this.solDetService.menSolicitudEsp;
    
  }


  listaInicial(): void {
    this.titulo = ' Estoy en Listado Inicial ';
    this.solDetService.obtenerListInicial().subscribe((resp) =>{
      if(  resp.length > 0 ){
        console.log(' se tiene tamaño superior a cero = ' + resp.length )
         this.lsSolicDetalles = resp;
      }else{
        console.log(' El tamaño Menor Igual a CERO =' + resp.length )
      }
    }, ( err ) => {
       console.log( err );
    }  ) ;
    
  }


  showBasicDialog ():void{
     this.displayBasic = true;
  }

}

