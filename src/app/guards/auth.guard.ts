import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private cookieService: CookieService){}

    canActivate(): boolean{

   if(this.cookieService.get('_userDGB23H9M')){

      this.getconsulta().then(response => {
        //console.log(response);
        if(response == undefined){
          //cookie
          this.cookieService.delete('_userDGB23H9M');
          this.cookieService.delete('_idDGB23H9M');
          this.cookieService.delete('_nameDGB23H9M');
          this.cookieService.delete('_fechaDGB23H9M');
          this.cookieService.delete('_homeDGB23H9M');

          this.router.navigateByUrl('/login');
        }else{
          //console.log('que se quede!!');
          
        }
      });

    }else{
      this.router.navigateByUrl('/login');
    }
    return true;
    
    }

    async getconsulta(){
      let respuesta;
      await this.auth.busquedadetoken( this.cookieService.get('_userDGB23H9M') , this.cookieService.get('_idDGB23H9M') ).toPromise().then((response) => {
        respuesta = response;
        //console.log(respuesta);
      }).catch(e => console.error(e));
      return respuesta;
    }

  }
  
