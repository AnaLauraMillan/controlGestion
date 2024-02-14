import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cgestion',
  templateUrl: './cgestion.component.html',
  styleUrls: ['./cgestion.component.scss']
})

export class CgestionComponent implements OnInit{

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.navigate(['/CG/Inicio/',{ outlets: { Secc: ['ControlGestion'] }}]);
  }

  onActive(){
    window.scroll(0,0);
  }
}

