import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutaqueryService {

  constructor() { }

  //ruta gloal de los php en el servidor
  //private server :string = "https://dgme.sep.gob.mx/revistaeducativa/php/";
  private server :string = "http://localhost/Programas/ControlGestion/php/";
 

  public serverQuery(){
    return this.server;
  }

}
