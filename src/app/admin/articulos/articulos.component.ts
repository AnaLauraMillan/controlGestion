import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})

export class ArticulosComponent implements OnInit{
  
  elements: any = [];
  headElements = ['#','Revista', 'Artículo', 'Fecha', 'URL', 'Total de comentarios', ''];
  
  constructor ( private dataService: ServicioService){}

  ngOnInit(): void {
    this.obtenerArticulos();
  }

  onActive(){
    window.scroll(0,0);
  }

  obtenerArticulos(){
    this.dataService.getArticulos().subscribe(resultArticulos => {
      this.elements = resultArticulos;
    }, err => {
      console.log(err);
    });
  }

}