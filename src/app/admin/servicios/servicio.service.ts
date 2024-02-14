import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { RutaqueryService } from 'src/app/services/rutaquery.service';

@Injectable({
  providedIn: 'root'
})

export class ServicioService {

  private url: string;

  constructor(private http: HttpClient, private urlquery: RutaqueryService) {
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'admin/Articulos/';
  }

  getArticulos(){
    return this.http.get(
      `${this.url}getArticulos.php`
    );
  }
  
}