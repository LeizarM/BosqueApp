import { Component, OnInit } from '@angular/core';
import { Tipos, lstTipoRelEmp } from 'src/app/protected/interfaces/Tipos';
import { lstDocumentoExpedido, lstSexo, lstEstadoCivil } from '../../../interfaces/Tipos';
import { Pais } from '../../../interfaces/Pais';
import { PaisService } from '../../../pais/services/pais.service';
import { RrhhService } from '../../services/rrhh.service';
import { Ciudad } from '../../../interfaces/Ciudad';
import { Zona } from '../../../interfaces/Zona';
import { Empresa } from 'src/app/protected/interfaces/Empresa';
import { EmpresaService } from '../../../empresas/services/empresa.service';
import { Sucursal } from 'src/app/protected/interfaces/Sucursal';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {


  lstExpedido       : Tipos[] = [];
  lstGenero         : Tipos[] = [];
  lstEstCivil       : Tipos[] = [];
  lstPais           : Pais[] = [];
  lstPaisResi       : Pais[] = [];
  lstCiudad         : Ciudad[] = [];
  lstZona           : Zona[] = [];
  lstRelacionLaboral: Tipos[] = [];
  lstEmpresas       : Empresa[] = [];
  lstSucursales     : Sucursal[] = [];



  constructor( private rrhhService    : RrhhService,
               private paisService    : PaisService,
               private empresaService : EmpresaService ) {
    //Obtener la lista de expediciones
    this.lstExpedido = lstDocumentoExpedido();
    //lista de genero
    this.lstGenero = lstSexo();
    // lista de estado civil
    this.lstEstCivil = lstEstadoCivil();
    //obtendra los paises
    this.obtenerPaises();
    //Obtendrea el tipo de relacion del nuevo empleado
    this.lstRelacionLaboral  = lstTipoRelEmp();
    //obtendra las empresas
    this.obtenerEmpresas();


  }

  ngOnInit(): void {
  }


  /**
   * Procedimiento para obtener Paises
   */
   obtenerPaises(): void {
    this.paisService.obtenerPaises().subscribe((resp) => {
      if (resp) {
        this.lstPais = resp;
        this.lstPaisResi = [...this.lstPais ];
      }
    }, (err) => {
      this.lstPais = [];
      console.log(err);
    });
  }


  /**
   * Cargara las ciudades al seleccionar un pais
   * @param event
   * @returns
   */
   cargarCiudades(event: any): void {

    if (!event.value) return;
    this.obtenerCiudadesXPais(event.value);
  }

  /**
   * Procedimiento para obtener las ciudades por pais
   * @param codPais
   */
   obtenerCiudadesXPais(codPais: number): void {
    this.rrhhService.obtenerCiudadesXPais(codPais).subscribe((resp) => {
      if (resp) {
        this.lstCiudad = resp;
      }
    }, (err) => {
      this.lstCiudad = [];
      console.log(err);
    });
  }

  /**
   * Cargara las Zonas por ciudad
   * @param event
   * @returns
   */
   cargarZonas(event: any): void {
    if( !event.value ) return;
    this.obtenerZonaXCiudad(event.value);

  }

  /**
   * Procedimiento para obtener las zonas por ciudad
   * @param codCiudad
   */
   obtenerZonaXCiudad(codCiudad: number): void {
    this.rrhhService.obtenerZonaxCiudad(codCiudad).subscribe((resp) => {

      if (resp.length > 0) {
        this.lstZona = resp;
      }
    }, (err) => {
      this.lstZona = [];
      console.log(err);
    });
  }

  /**
   * obtendra las empresas registradas
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
   * Obtener las sucursales
   */
  cargarSucursales( event : any){
    if (!event.value) return;
    this.obtenerSucursalesXEmpresa( event.value );
  }


   /**
   * Obtendra las sucursales por empresa
   * @param codEmpresa
   */
    obtenerSucursalesXEmpresa(codEmpresa: number): void {
      this.rrhhService.obtenerSucursalesXEmpresa(codEmpresa).subscribe((resp) => {
        if (resp) {
          this.lstSucursales = resp;
          console.log(this.lstSucursales);
        }
      }, (err) => {
        console.log(err);
        this.lstSucursales = [];
      });
    }


}
