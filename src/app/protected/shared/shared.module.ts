import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VistaModule } from '../vista/vista.module';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    VistaModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
