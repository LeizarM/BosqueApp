import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor( private loginService: LoginService,
               private router: Router ){

  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | boolean  {

    /* if( this.loginService.obtenerUsuario.codUsuario ) return true;
    return false; */

    return true;//this.loginService.verificarLogin()

  }


  canLoad( route: Route,    segments: UrlSegment[] ): Observable<boolean> |  boolean {

    if( this.loginService.obtenerUsuario.codUsuario ) return true;

    return false;
  }
}
