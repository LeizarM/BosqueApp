import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PreciosModule } from './precios/precios.module';
import { DocumentoComponent } from './cartas-cite/pages/documento/documento.component';

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
		PreciosModule

	]
})
export class ProtectedModule { }
