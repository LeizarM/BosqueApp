import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FichaTrabajadorComponent } from './pages/ficha-trabajador/ficha-trabajador.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { DatoEsposoConvivienteComponent } from './pages/dato-esposo-conviviente/dato-esposo-conviviente.component';
import { DatoEducacionComponent } from './pages/dato-educacion/dato-educacion.component';
import { DatoFormacionComponent } from './pages/dato-formacion/dato-formacion.component';



@NgModule({
  declarations: [

    FichaTrabajadorComponent,
    DatosPersonalesComponent,
    DatoEsposoConvivienteComponent,
    DatoFormacionComponent,
    DatoEducacionComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [

  ]
})
export class FichaTrabajadorModule { }
