import { Component, OnInit } from '@angular/core';

import { Empresa } from '../../interfaces/Empresa';
import { EmpresaService } from '../../empresa/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  lstEmpresas : Empresa[] = [];

  constructor( private empresaService: EmpresaService ) {
    this.obtenerEmpresas();
   }

  ngOnInit(): void {
  }

  /**
   * Procedimiento para obtener Empresas registradas
   */
   obtenerEmpresas(): void {
    this.empresaService.obtenerEmpresas().subscribe((resp) => {
      if (resp) {
        this.lstEmpresas = resp;
      }
    }, (err) => {
      this.lstEmpresas = [];
      console.log(err);
    });
   }
}
