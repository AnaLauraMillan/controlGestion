import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { FormControl, FormGroup, FormBuilder, Validators, NgModel} from '@angular/forms';

import { GetdatosService } from '../../services/getdatos.service';

@Component({
  selector: 'app-modal-detalles-i',
  templateUrl: './modal-detalles-i.component.html',
  styleUrls: ['./modal-detalles-i.component.scss']
})
export class ModalDetallesIComponent implements OnInit {

  idUsu: any;
  idOficio: any;
  Noficio: any;

  constructor(public modalRef: MDBModalRef, private _getDatosService: GetdatosService) {}

  ngOnInit(): void {
    let dat = {'idOficio': this.idOficio}
    this._getDatosService.postOficioInt(dat).subscribe(rest=>{
      if(rest != null) {
        this.Noficio = rest[0].num_oficioInterno;
      }
    });
  }
}

