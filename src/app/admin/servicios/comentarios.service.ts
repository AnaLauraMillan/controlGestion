import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { RutaqueryService } from 'src/app/services/rutaquery.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComentariosService {

  private url: string;

  constructor(private http: HttpClient, private urlquery: RutaqueryService) {
    this.url = this.urlquery.serverQuery();
    this.url = this.url + 'admin/Comentarios/';
  }

  postComentarios(dat:any){
    return this.http.post(
      `${this.url}comentarios_original.php`,dat
    );
  }

  postAutorizarCom(datos:any){
    return this.http.post(
      `${this.url}autorizar_comentarios.php`,datos
    );
  }

  postDelete(datos): Observable <any> {
    return this.http.post(
     this.url+datos.php+'.php', datos
    );
  }

}