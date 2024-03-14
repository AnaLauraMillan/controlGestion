import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

import { GetdatosService } from '../services/getdatos.service';
import { ModalOInternoComponent } from '../modals/modal-ointerno/modal-ointerno.component';
import { ModalDetallesIComponent } from '../modals/modal-detalles-i/modal-detalles-i.component';

@Component({
  selector: 'app-principal-vista',
  templateUrl: './principal-vista.component.html',
  styleUrls: ['./principal-vista.component.scss']
})
export class PrincipalVistaComponent implements OnInit {

  //variables
  public tokenUsu: any;
  modalRef: MDBModalRef | null = null;

  usuID: any;
  IdDireccion: any;

  selectedValue: number = 2;
  externo: boolean = false;
  interno: boolean = false;

  tipoOficio: any = [];
  oficiosExternos: any = [];
  oficiosInternos: any = [];

  headElementsE = ['NÚMERO DE OFICIO','REMITENTE', 'FECHA DE RECIBIDO','TIPO DE DOCUMENTO DE ENTRADA', 'CLASIFICACIÓN', 'RESOLUCIÓN','NÚMERO DE OFICIO DE RESPUESTA', 'FECHA DE RESPUESTA', 'DOCUMENTO DE RESPUESTA', 'FECHA DE CIERRE', 'ARCHIVO DE ENTRADA', 'ARCHIVO DE RESPUESTA', 'ACUSE DE MENSAJERÍA', ' ', ' '];
  headElementsI = ['NÚMERO DE OFICIO','REMITENTE', 'FECHA DE DOCUMENTO','DESTINO', 'FECHA DE ENVÍO', 'TIPO DE DOCUMENTO','CLASIFICACIÓN', 'RESOLUCIÓN', 'NÚMERO DE OFICIO DE RESPUESTA', 'FECHA DE RESPUESTA', 'FECHA DE CIERRE', 'ARCHIVO DE ENTRADA', 'ARCHIVO DE RESPUESTA', 'ACUSE DE MENSAJERÍA', ' ', ' '];

  constructor(private _getdatos: GetdatosService, private cookieService: CookieService, private auth: AuthService, private router:Router,private _modalService: MDBModalService){}

  ngOnInit(): void {

    //Se obtiene la dirección que se encuentra logueada
    this.tokenUsu = {'token': this.cookieService.get('_idDGB23H9M')};
    this.verificaSesion(this.tokenUsu);
    
    //Servicio que llena el selector del tipo de Oficio
    this._getdatos.getTipoOficio().subscribe(result =>{
      if(result != null) {
        this.tipoOficio = result;
      }
    });

    this.getSelectedValueTipO(this.selectedValue);   
  }

  /*Método que verifica que el usuario que inicie sesión esté relacionado a una dirección
  de lo contrario se cierra la sesión del usuario */
  verificaSesion( token: any) {
    this._getdatos.postDatosSesion(token).subscribe(result => {
      if (result != false) {
         this.usuID = result[0].usu_id;
         this.IdDireccion = result[0].id_direccion;

        let dat = {'IdUsu': this.usuID, 'IdDL': this.IdDireccion};
        this.getDatosDireccionInt(dat);
      } 
      else {
        this.logout();
      }
    });
  }

  //Método que obtiene el valor seleccionado en el tipo de oficio
  getSelectedValueTipO(value: any) {
    this.externo = false;
    this.interno = false;
    switch(Number(value)) {
      case 1: 
      this.externo = true;
      this.interno = false;
      this.getDatosDireccionExt(this.usuID);
      break;
      case 2:
        this.interno = true;
        this.externo = false;
        this.verificaSesion(this.tokenUsu);
        // let dat = {'IdUsu': this.usuID, 'IdDL': this.IdDireccion};
        // this.getDatosDireccionInt(dat);
      break;
    }
  }

  //Método que obtiene los oficios externos solo de la dirección que se encuentra logueada
  getDatosDireccionExt(dat: any) {
    let idDir = {'IdUsu': dat};
    this._getdatos.postOficiosExt(idDir).subscribe(resultExt => {
      //console.log(resultExt);
      if(resultExt != null) {
        this.oficiosExternos = resultExt;
        console.log(this.oficiosExternos);
      }
    });
  }

  //Método que obtiene los oficios internos solo de la dirección que se encuentra logueada
  getDatosDireccionInt(dat: any) {
    //console.log(dat);
    this._getdatos.postOficios(dat).subscribe(result => {
      if(result != null) {
        this.oficiosInternos = result;
      }
    });
  }

  //Se registra nuevo Oficio Externo
  openModalExterno(){
    console.log("Externo");
  }

  //Se registra nuevo Oficio Interno
  openModalInterno(){
    this.modalRef = this._modalService.show(ModalOInternoComponent, {
      data: { 'idUsu': this.usuID, 'idDL': this.IdDireccion, 'TOfi': this.selectedValue},
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      containerClass: 'top',
      animated: true,
    });
  }

  //Se ven los detalles del Oficio Interno
  verDetallesInt(idOficio: any) {
    this.modalRef = this._modalService.show(ModalDetallesIComponent, {
      data: { 'idUsu': this.usuID, 'idDL': this.IdDireccion, 'TOfi': this.selectedValue, 'idOficio': idOficio},
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: true,
      containerClass: 'top',
      animated: true,
      modalClass: 'modal-fullscreen-xxl-down'
    });
  }

  //Respuesta del Oficio Interno
  RespOInt(){
    
  }

  onActive(){
    window.scroll(0,0);
  }

  logout(){
    const dat = {
      "correo": this.cookieService.get('_nameDGB23H9M'),
      "token": this.cookieService.get('_idDGB23H9M')
    };
    //console.log(dat);
    this.auth.logout(dat).subscribe(
      res => {
      //console.log( res );
      if(res){
        //cookie
        this.cookieService.delete('_userQXD1PZ8J');
        this.cookieService.delete('_idQXD1PZ8J');
        this.cookieService.delete('_nameQXD1PZ8J');
        this.cookieService.delete('_fechaQXD1PZ8J');
        this.cookieService.delete('_homeQXD1PZ8J');
        
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

  // ********insert a mensajeria desde php que guarda los datos del formulario *************
}
