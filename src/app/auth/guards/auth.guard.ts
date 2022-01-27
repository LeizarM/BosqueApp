import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private loginService: LoginService,
    private router: Router) {

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {

    if (this.loginService.obtenerUsuario.codUsuario! > 0 && this.loginService.obtenerToken.length > 0 ) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.loginService.obtenerUsuario.codUsuario! > 0 && this.loginService.obtenerToken.length > 0){
      return true;
    }else{
      this.router.navigate(['/auth']);
      return false;
    }

  }



}
