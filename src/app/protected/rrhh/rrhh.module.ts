import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';

import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { EstructuraOrgComponent } from './pages/estructura-org/estructura-org.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleado/registro-empleado.component';
import { DetalleEmpleadoComponent } from './pages/detalle-empleado/detalle-empleado.component';


//Pipes
import { GeneroPipe } from './pipes/genero.pipe';
import { EstadoCivilPipe } from './pipes/estado-civil.pipe';
import { RelacionEmpresaPipe } from './pipes/relacion-empresa.pipe';
import { ActivoEInactivoPipe } from './pipes/activo-einactivo.pipe';



@NgModule({
  declarations: [
    EmpleadosComponent,
    EstructuraOrgComponent,
    RegistroEmpleadoComponent,
    DetalleEmpleadoComponent,

    //Pipes
    GeneroPipe,
    EstadoCivilPipe,
    RelacionEmpresaPipe,
    ActivoEInactivoPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports: [
    EstadoCivilPipe,
    RelacionEmpresaPipe,
    ActivoEInactivoPipe
  ]
})
export class RrhhModule { }
