import { CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

  
export class direccionGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService){}
  public band:boolean = false;

  canActivate(): boolean{
    const dat = {
      "correo": this.cookieService.get('_userDGB23H9M'),
      "token": this.cookieService.get('_idDGB23H9M')
    };
    this.getconsultap( dat ).then(response => {
      
      if(response['id_perfil'] !=3){

        this.auth.logout(dat).subscribe();
        //cookie delete
        this.cookieService.delete('_userDGB23H9M');
        this.cookieService.delete('_idDGB23H9M');
        this.cookieService.delete('_nameDGB23H9M');
        this.cookieService.delete('_fechaDGB23H9M');
        this.cookieService.delete('_homeDGB23H9M');
        
        this.router.navigateByUrl('/login');

      }
    });
    return true;
  } 

  async getconsultap( dat ){
  
  let respuesta;
  await this.auth.perfil( dat ).toPromise().then((response) => {
    respuesta = response;
    //console.log(respuesta);
  }).catch(e => console.error(e));

  return respuesta;
  }
};

