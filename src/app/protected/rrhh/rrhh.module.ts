import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';

import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { EstructuraOrgComponent } from './pages/estructura-org/estructura-org.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleado/registro-empleado.component';


@NgModule({
  declarations: [
    EmpleadosComponent,
    EstructuraOrgComponent,
    RegistroEmpleadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class RrhhModule { }
