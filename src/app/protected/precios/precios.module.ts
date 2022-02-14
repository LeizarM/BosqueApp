import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutorizacionComponent } from './pages/autorizacion/autorizacion.component';
import { MenuPreciosComponent } from './pages/menu-precios/menu-precios.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FamiliasComponent } from './pages/familias/familias.component';




@NgModule({
  declarations: [
    AutorizacionComponent,
    MenuPreciosComponent,
    FamiliasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule

  ]
})
export class PreciosModule { }
