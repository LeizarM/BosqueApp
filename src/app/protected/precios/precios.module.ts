import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorizacionComponent } from './pages/autorizacion/autorizacion.component';
import { MenuPreciosComponent } from './pages/menu-precios/menu-precios.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';




@NgModule({
  declarations: [
    AutorizacionComponent,
    MenuPreciosComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule

  ]
})
export class PreciosModule { }
