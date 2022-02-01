import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({

  exports: [
    PanelMenuModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    RippleModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    DropdownModule

  ]
})
export class PrimeNgModule { }
