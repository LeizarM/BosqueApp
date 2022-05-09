import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleado/registro-empleado.component';
import { DetalleEmpleadoComponent } from './pages/detalle-empleado/detalle-empleado.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { DatosEmpleadoComponent } from './pages/datos-empleado/datos-empleado.component';
import { DatoEmailComponent } from './pages/dato-email/dato-email.component';
import { DatoTelefonosComponent } from './pages/dato-telefonos/dato-telefonos.component';
import { DatoFormacionComponent } from './pages/dato-formacion/dato-formacion.component';
import { DatoLicenciaConducirComponent } from './pages/dato-licencia-conducir/dato-licencia-conducir.component';

//Pipes
import { GeneroPipe } from './pipes/genero.pipe';
import { EstadoCivilPipe } from './pipes/estado-civil.pipe';
import { RelacionEmpresaPipe } from './pipes/relacion-empresa.pipe';
import { ActivoEInactivoPipe } from './pipes/activo-einactivo.pipe';
import { FormacionPipe } from './pipes/formacion.pipe';
import { CiExpedidoPipe } from './pipes/ci-expedido.pipe';
import { DatoExperienciaLaboralComponent } from './pages/dato-experiencia-laboral/dato-experiencia-laboral.component';
import { PaisPipe } from './pipes/pais.pipe';




@NgModule({
  declarations: [
    EmpleadosComponent,
    RegistroEmpleadoComponent,
    DetalleEmpleadoComponent,
    DatosPersonalesComponent,
    DatosEmpleadoComponent,
    DatoEmailComponent,
    DatoTelefonosComponent,
    DatoExperienciaLaboralComponent,
    DatoFormacionComponent,
    DatoLicenciaConducirComponent,

    //Pipes
    GeneroPipe,
    EstadoCivilPipe,
    RelacionEmpresaPipe,
    ActivoEInactivoPipe,
    FormacionPipe,
    CiExpedidoPipe,
    PaisPipe,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    EstadoCivilPipe,
    RelacionEmpresaPipe,
    ActivoEInactivoPipe
  ]
})
export class RrhhModule { }
