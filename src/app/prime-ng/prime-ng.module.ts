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
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

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
    DropdownModule,
    CardModule,
    PanelModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    CalendarModule,
    ToastModule,
    InputNumberModule,
    KeyFilterModule,
    BlockUIModule,
    ConfirmPopupModule

  ]
})
export class PrimeNgModule { }
