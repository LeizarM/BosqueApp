import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { DropdownEmpresaComponent } from './dropdown-empresa/dropdown-empresa.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownEmpresaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports:[
    DropdownEmpresaComponent
  ]
})
export class ComponentsModule { }
