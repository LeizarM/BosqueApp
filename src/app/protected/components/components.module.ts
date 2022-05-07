import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { DropdownEmpresaComponent } from './dropdown-empresa/dropdown-empresa.component';



@NgModule({
  declarations: [
    DropdownEmpresaComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    DropdownEmpresaComponent
  ]
})
export class ComponentsModule { }
