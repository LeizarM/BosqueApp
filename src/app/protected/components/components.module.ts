import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './empresas/empresas.component';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    EmpresasComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    ComponentsModule
  ]
})
export class ComponentsModule { }
