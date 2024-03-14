import { Injectable } from '@angular/core';
import { RutaqueryService } from 'src/app/services/rutaquery.service';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UpDocIntService {

  private url: string;
  constructor(private http: HttpClient, private urlquery: RutaqueryService) { 
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'direccion/';
  }

  subirArchivo(datos: any): Observable<any> {
    //console.log(datos);
    return this.http.post( `${this.url}uploadfileInt.php`,datos);
  }
}
