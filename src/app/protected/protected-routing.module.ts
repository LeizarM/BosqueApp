import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DocumentoComponent } from './cartas-cite/pages/documento/documento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { AutorizacionComponent } from './precios/pages/autorizacion/autorizacion.component';
import { FamiliasComponent } from './precios/pages/familias/familias.component';

 const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children : [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'tprAutorizacion/Autorizacion',
        component: AutorizacionComponent
      },
      {
        path: 'tprAutorizacion/Autorizacion/familias',
        component: FamiliasComponent
      },
      {
        path: 'tcrDocumento/Documento',
        component: DocumentoComponent
      },
      {
        path: '**',
        redirectTo: ''
      },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [ RouterModule
  ]
})
export class ProtectedRoutingModule { }
