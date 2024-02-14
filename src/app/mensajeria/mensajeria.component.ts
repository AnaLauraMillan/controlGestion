import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss']
})
export class MensajeriaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/Mensajeria/Inicio/',{ outlets: { Secc: ['Mensajeria'] }}])
  }

  onActive(){
    window.scroll(0,0);
  }

}

