import { Injectable } from '@angular/core';
import { RutaqueryService } from 'src/app/services/rutaquery.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertOficioService {

  private url: string;
  constructor(private http: HttpClient, private urlquery: RutaqueryService) { 
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'direccion/';
  }

  postInsertOI(dat: any ): Observable <any> {
    //console.log(dat);
    return this.http.post(`${this.url}InsertOficioInt.php`, dat);
  }
}
