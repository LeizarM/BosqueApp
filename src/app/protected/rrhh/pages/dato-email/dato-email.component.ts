import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../../../interfaces/Email';

@Component({
  selector: 'app-dato-email',
  templateUrl: './dato-email.component.html',
  styleUrls: ['./dato-email.component.css']
})
export class DatoEmailComponent  {

  @Input() emails : Email[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
