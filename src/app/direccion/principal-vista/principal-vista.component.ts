import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-vista',
  templateUrl: './principal-vista.component.html',
  styleUrls: ['./principal-vista.component.scss']
})
export class PrincipalVistaComponent implements OnInit {

  ngOnInit(): void {
    
  }

  onActive(){
    window.scroll(0,0);
  }
}
