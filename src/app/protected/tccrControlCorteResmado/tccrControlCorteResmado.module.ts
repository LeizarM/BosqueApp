import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';


import { SolicitudCorteComponent } from './pages/solicitudCorte/solicitudCorte.component';
import { DatoEstandarComponent } from './pages/dato-estandar/dato-estandar.component';
import { DatoEspecialComponent } from './pages/dato-especial/dato-especial.component';


@NgModule({
  declarations: [
    SolicitudCorteComponent,
    DatoEstandarComponent,
    DatoEspecialComponent
  ],

  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
  
})

export class TccrControlCorteResmadoModule { }
