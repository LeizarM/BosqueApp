import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PreciosModule } from './precios/precios.module';
import { DocumentoComponent } from './cartas-cite/pages/documento/documento.component';
import { RrhhModule } from './rrhh/rrhh.module';
import { FichaTrabajadorModule } from './ficha-trabajador/ficha-trabajador.module';



@NgModule({
	declarations: [
		LayoutComponent,
		DashboardComponent,
		DocumentoComponent,



	],
	imports: [
		CommonModule,
		ProtectedRoutingModule,
		SharedModule,
		PreciosModule,
    RrhhModule,
    FichaTrabajadorModule

	]
})
export class ProtectedModule { }
