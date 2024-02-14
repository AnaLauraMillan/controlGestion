import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal-cgestion',
  templateUrl: './principal-cgestion.component.html',
  styleUrls: ['./principal-cgestion.component.scss']
})
export class PrincipalCGestionComponent implements OnInit {

  ngOnInit(): void {
    
  }
  onActive(){
    window.scroll(0,0);
  }
}
