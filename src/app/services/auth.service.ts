import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RutaqueryService } from './rutaquery.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  array: {};
  private url: string;

  constructor(private http: HttpClient, private urlquery: RutaqueryService) { 
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'user/';
    //console.log(this.url);
  }

  login( dat: any){
    return this.http.post(
      `${this.url}usuario.php`, dat
    ).pipe(map(resp => {
        return resp;
    }));
  }

  busquedadetoken( correo, id ){
    
    const tokenData = {
      "correo": correo,
      "token": id
    };
    //console.log( tokenData);
    // ubicacion del php para buscar token
    return this.http.post(
      `${this.url}token.php`, tokenData
    ).pipe(map(resp => {
        return resp;
    }));
  }

  logout(dat: any){
    return this.http.post(
      `${this.url}usuarios_out.php`, dat
    ).pipe(map(resp => {
        return resp;
    }));
  }

  perfil(dat: any){
    return this.http.post(
      `${this.url}perfil.php`, dat
    ).pipe(map(resp => {
        return resp;
    }));
  }

}
