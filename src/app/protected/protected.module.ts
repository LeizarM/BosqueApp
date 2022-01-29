import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ProtectedRoutingModule } from './protected-routing.module';


import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentoComponent } from './cartas-cite/pages/documento/documento.component';
import { AutorizacionComponent } from './precios/pages/autorizacion/autorizacion.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    DocumentoComponent,
    AutorizacionComponent

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    PrimeNgModule

  ]
})
export class ProtectedModule { }
