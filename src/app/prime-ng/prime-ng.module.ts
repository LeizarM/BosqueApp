import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
@NgModule({
  imports: [
  ],
  exports: [
    PanelMenuModule,
    MessagesModule,
    MessageModule

  ]
})
export class PrimeNgModule { }
