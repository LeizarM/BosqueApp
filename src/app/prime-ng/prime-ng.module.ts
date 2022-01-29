import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({

  exports: [
    PanelMenuModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule

  ]
})
export class PrimeNgModule { }
