import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ficha-trabajador',
  templateUrl: './ficha-trabajador.component.html',
  styleUrls: ['./ficha-trabajador.component.css'],
  providers: [ MessageService ]

})
export class FichaTrabajadorComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor( private messageService: MessageService ) { }

  ngOnInit(): void {
  }

  /* onBasicUpload(event) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}*/

}
