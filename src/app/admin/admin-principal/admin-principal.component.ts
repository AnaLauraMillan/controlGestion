import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-principal',
  templateUrl: './admin-principal.component.html',
  styleUrls: ['./admin-principal.component.scss']
})
export class AdminPrincipalComponent implements OnInit {

  ngOnInit(): void {
    
  }

  onActive(){
    window.scroll(0,0);
  }
}
