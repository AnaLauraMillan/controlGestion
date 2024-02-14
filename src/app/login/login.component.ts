import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('sidenav', { static: true }) public el: any;
  redireccionar: any;

  @HostListener('swiperight', ['$event']) public swipePrev(event: any) {
  this.el.show();
  }
  forma!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,private router:Router, private cookieService: CookieService) { 
    this.crearFormulario();
    this.cargarDataFormulario();
  }

  ngOnInit(): void {

    if(this.cookieService.get('_userDGB23H9M'),this.cookieService.get('_idDGB23H9M')){
      this.router.navigateByUrl(this.cookieService.get('_homeDGB23H9M')); 
    };
  }

  ngAfterViewInit() {
    if( this.cookieService.get('_userDGB23H9M')){
      this.forma.reset({
        correo: this.cookieService.get('_userDGB23H9M')
  
      });
    }
    //si no cerro la sesion un dia anterior
    let local = this.cookieService.get('_fechaDGB23H9M')
    var datels = local.split('-');

    if(Number(datels[1]) != new Date().getDate() || Number(datels[0])-1 != new Date().getMonth()){
      //cookie delete
      this.cookieService.delete('_userDGB23H9M');
      this.cookieService.delete('_idDGB23H9M');
      this.cookieService.delete('_nameDGB23H9M');
      this.cookieService.delete('_fechaDGB23H9M');
    }
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get passwordNoValido(){
    return this.forma.get('password')?.invalid && this.forma.get('password')?.touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      correo:   ['', [Validators.required] ],
      password:   ['', [Validators.required] ]
    });
  }

  cargarDataFormulario(){
    
    this.forma.reset({
      correo: "",
      password: ""

    });
  }

  resaltar(){
    //console.log(this.forma);
    return Object.values( this.forma.controls ).forEach( control => {
      if( control instanceof FormGroup){
        Object.values( control.controls ).forEach( control => control.markAsTouched() );
      }else{
        control.markAsTouched();
      }
    });
  }

  compro(){
    //console.log(this.forma);
    if(this.forma.invalid){
      //console.log(this.forma);
     return this.resaltar();
    }else{
      //console.log( this.forma.get('correo').value);
      const dat = {
        "correo": this.forma.get('correo').value,
        "password": this.forma.get('password').value,
        "token": this.cookieService.get('_idDGB23H9M')
      };
      //console.log(dat);
      this.auth.login(dat).subscribe(
        res => {
          //console.log( res );
        if(res){
          this.guardarToken( res );
        }else{
          alert('contraseña incorrecta o haz llegado al limite de sesiones simultaneas por usuario, cierra alguna e intenta de nuevo.');
          this.forma.reset();
          return this.resaltar();
        }

        },
        err =>{
          //console.log(err);
          this.forma.reset();
          return this.resaltar();
        }
      );
    }
  }

  private guardarToken( datos ){
    //console.log(datos);
    //cookie
    this.cookieService.set('_userDGB23H9M', datos['usu_login'],1);
    this.cookieService.set('_idDGB23H9M', datos['token'],1);
    this.cookieService.set('_nameDGB23H9M', datos['usu_nombre'],1);
    this.cookieService.set('_fechaDGB23H9M', datos['fecha'],1);
    this.cookieService.set('_homeDGB23H9M', datos['home'],1);
    
    this.router.navigateByUrl(datos['home']); 
  }
}
