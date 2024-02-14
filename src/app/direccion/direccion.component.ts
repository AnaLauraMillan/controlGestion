import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss']
})
export class DireccionComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.navigate(['/Direccion/Inicio/',{ outlets: { Secc: ['Area'] }}])
  }

  onActive(){
    window.scroll(0,0);
  }
  
}

