import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  nombre : String;

  constructor(private router:Router, private auth: AuthService, private cookieService: CookieService){}

  ngOnInit(): void {
    this.nombre = this.cookieService.get('_nameDGB23H9M');
  }

  logout(){
    const dat = {
      "correo": this.cookieService.get('_userDGB23H9M'),
      "token": this.cookieService.get('_idDGB23H9M')
    };
    //console.log(dat);
    this.auth.logout(dat).subscribe(
      res => {
      //console.log( res );
      if(res){

        //cookie delete
        this.cookieService.delete('_userDGB23H9M');
        this.cookieService.delete('_idDGB23H9M');
        this.cookieService.delete('_nameDGB23H9M');
        this.cookieService.delete('_fechaDGB23H9M');
        this.cookieService.delete('_homeDGB23H9M');

        this.router.navigateByUrl('/login');
      }else{
        alert('no se pudo cerra la sesión, intentalo de nuevo');
      }

      },
      err =>{
        console.log(err);
       
      }
    );

    
  }
  
}
