import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FichaTrabajadorComponent } from './pages/ficha-trabajador/ficha-trabajador.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { DatoEsposoConvivienteComponent } from './pages/dato-esposo-conviviente/dato-esposo-conviviente.component';
import { DatoEducacionComponent } from './pages/dato-educacion/dato-educacion.component';
import { DatoFormacionComponent } from './pages/dato-formacion/dato-formacion.component';
import { GeneroPipe } from './pipes/genero.pipe';
import { DependienteComponent } from './pages/dependiente/dependiente.component';
import { GaranteReferenciaComponent } from './pages/garante-referencia/garante-referencia.component';
import { CiExpedidoPipe } from './pipes/ci-expedido.pipe';
import { PaisPipe } from './pipes/pais.pipe';
import { DatoIngresoComponent } from './pages/dato-ingreso/dato-ingreso.component';
import { DatoExperienciaComponent } from './pages/dato-experiencia/dato-experiencia.component';
import { FormacionPipe } from './pipes/formacion.pipe';
import { TipoDuracionPipe } from './pipes/tipo-duracion.pipe';
import { EstadoCivilPipe } from './pipes/estado-civil.pipe';



@NgModule({
  declarations: [

    FichaTrabajadorComponent,
    DatosPersonalesComponent,
    DatoEsposoConvivienteComponent,
    DatoFormacionComponent,
    DatoEducacionComponent,
    DependienteComponent,
    GaranteReferenciaComponent,

    //Pipes
    GeneroPipe,
    CiExpedidoPipe,
    PaisPipe,
    DatoIngresoComponent,
    DatoExperienciaComponent,
    FormacionPipe,
    TipoDuracionPipe,
    EstadoCivilPipe,


  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ],
  exports: [
    GeneroPipe,

  ]
})
export class FichaTrabajadorModule { }
