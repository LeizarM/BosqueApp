import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';

import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { EstructuraOrgComponent } from './pages/estructura-org/estructura-org.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleado/registro-empleado.component';
import { DetalleEmpleadoComponent } from './pages/detalle-empleado/detalle-empleado.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';

//Pipes
import { GeneroPipe } from './pipes/genero.pipe';
import { EstadoCivilPipe } from './pipes/estado-civil.pipe';
import { RelacionEmpresaPipe } from './pipes/relacion-empresa.pipe';
import { ActivoEInactivoPipe } from './pipes/activo-einactivo.pipe';
import { DatosEmpleadoComponent } from './pages/datos-empleado/datos-empleado.component';
import { DatoEmailComponent } from './pages/dato-email/dato-email.component';
import { DatoTelefonosComponent } from './pages/dato-telefonos/dato-telefonos.component';
import { DatoExperienciaLaboralComponent } from './pages/dato-experiencia-laboral/dato-experiencia-laboral.component';
import { DatoFormacionComponent } from './pages/dato-formacion/dato-formacion.component';
import { DatoLicenciaConducirComponent } from './pages/dato-licencia-conducir/dato-licencia-conducir.component';
import { FormacionPipe } from './pipes/formacion.pipe';
import { CiExpedidoPipe } from './pipes/ci-expedido.pipe';



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
    DatosPersonalesComponent,
    DatosEmpleadoComponent,
    DatoEmailComponent,
    DatoTelefonosComponent,
    DatoExperienciaLaboralComponent,
    DatoFormacionComponent,
    DatoLicenciaConducirComponent,
    FormacionPipe,
    CiExpedidoPipe,
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
