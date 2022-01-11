import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private style : string = 'sb-nav-fixed';

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, this.style );
 }

  ngOnInit(): void {
  }

  /**
   * Procedimiento para comprimir o expandir el sidebar o menu lateral
   */
  mostrarOcultarNavBar(){
    if( this.style === 'sb-nav-fixed' ){
      this.renderer.removeClass(document.body, this.style);
      this.style = 'sb-sidenav-toggled';
    }else{
      this.renderer.removeClass(document.body, this.style);
      this.style = 'sb-nav-fixed';
    }
    this.renderer.addClass(document.body, this.style );
    this.renderer.addClass(document.body, 'sb-nav-fixed' );

  }

}
