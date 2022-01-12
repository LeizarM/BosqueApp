import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,

  ]
})
export class ProtectedModule { }
