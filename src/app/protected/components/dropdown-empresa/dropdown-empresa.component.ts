import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { DropdownEmpresaService } from './services/dropdown-empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-empresa',
  templateUrl: './dropdown-empresa.component.html',
  styleUrls: ['./dropdown-empresa.component.css']
})
export class DropdownEmpresaComponent implements OnInit {

  @Input() codEmpresaPadre: number = 0;

  @Output() cambioEmpresa: EventEmitter<number> = new EventEmitter();

  lstEmpresas: Empresa[] = [];
  empresa: number = 1;

  constructor(private dropdownEmpresaService: DropdownEmpresaService) {

  }

  ngOnInit(): void {
    console.log("el cod empresa recibido es ", this.codEmpresaPadre);
    this.obtenerEmpresas();
  }


  /**
   * Procedimiento para obtener Empresas registradas
   */
  obtenerEmpresas(): void {
    this.dropdownEmpresaService.obtenerEmpresas().subscribe((resp) => {
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
