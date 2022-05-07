import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Empresa } from '../../interfaces/Empresa';
import { EmpresaService } from '../../empresas/services/empresa.service';

@Component({
  selector: 'app-dropdown-empresa',
  templateUrl: './dropdown-empresa.component.html',
  styleUrls: ['./dropdown-empresa.component.css']
})
export class DropdownEmpresaComponent implements OnInit {


  @Output() cambioEmpresa: EventEmitter<number> = new EventEmitter();

  lstEmpresas: Empresa[] = [];


  constructor(private empresaService: EmpresaService) {

  }

  ngOnInit(): void {
    this.obtenerEmpresas();
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

  /**
   * Procedimiento para cambio de empresa
  */
  cambioCodEmpresa(event: any): void {
    this.cambioEmpresa.emit(event.value);
  }

}
