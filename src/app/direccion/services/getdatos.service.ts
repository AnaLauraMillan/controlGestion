import { Injectable } from '@angular/core';
import { RutaqueryService } from 'src/app/services/rutaquery.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetdatosService {

  private url: string;
  constructor(private http: HttpClient, private urlquery: RutaqueryService) { 
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'direccion/';
  }

  postDatosSesion(token: any ): Observable <any> {
    //console.log(token);
    return this.http.post(`${this.url}getDatosSesion.php`, token);
  }

  getTipoOficio(){
    return this.http.get(`${this.url}getTipo_Oficio.php`);
  }

  getClasificacion(){
    return this.http.get(`${this.url}getClasificacion.php`);
  }

  getArea(){
    return this.http.get(`${this.url}getArea.php`);
  }

  getAreaD(){
    return this.http.get(`${this.url}getAreaDest.php`);
  }

  getTipoDoc(){
    return this.http.get(`${this.url}getTipoDoc.php`);
  }

  postOficiosExt(idDir:any): Observable <any> {
    //console.log(idDir);
    return this.http.post(`${this.url}getOficiosExternos.php`, idDir);
  }

  postAreaN(idDir:any){
    return this.http.post(`${this.url}postArea.php`, idDir);
  }

  postOficios(idDir:any){
    return this.http.post(`${this.url}getOficiosIE.php`, idDir);
  }

  postOficioInt(idDir:any){
    return this.http.post(`${this.url}postOficioInt.php`, idDir);
  }
  
}
