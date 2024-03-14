import { Component, OnInit, EventEmitter } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { FormControl, FormGroup, FormBuilder, Validators, NgModel} from '@angular/forms';
import { Observable,Subject, Subscription } from 'rxjs';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
import { humanizeBytes } from 'ng-uikit-pro-standard';

import { GetdatosService } from '../../services/getdatos.service';
import { UpDocIntService } from '../../services/up-doc-int.service';
import { request } from 'http';
import { InsertOficioService } from '../../services/insert-oficio.service';

@Component({
  selector: 'app-modal-ointerno',
  templateUrl: './modal-ointerno.component.html',
  styleUrls: ['./modal-ointerno.component.scss']
})

export class ModalOInternoComponent implements OnInit {

  OfiInterno: FormGroup;
  dat: any | null = null;
  action = new Subject<any>();
  FormData: FormData;
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  document: any;

  content: any = null;
  banexos: boolean = false;
  banTurno: boolean = false;
  status: boolean = false;
  verDocumento: boolean = false;
  nameArchivo: boolean = false;
  barchivo: boolean = false;
  bodest: boolean = false; 
  archivo:any
  message: String = '';
  rutaArchivo: any;
  idDL: any ;
  idUsu: any;
  TOfi: any;
  anexo: any;
  destinatario: any;
  areaT: any;
  fechaT: any;
  resol: any;
  areRemi: any;
  otroDestino: any;

  clasOficio: any = [];
  area: any = [];
  clasificacion: any = [];
  tipOficio: any = [];
  areaDes: any = [];
  files: UploadFile[];

  constructor(public modalRef: MDBModalRef,private formBuilder: FormBuilder, private _getDatosService: GetdatosService, private _up_doc: UpDocIntService, private _insertOI : InsertOficioService) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit(): void {
    this.obtieneDatos();
    this.crearFormulario();
  }

  crearFormulario(){
    this.OfiInterno = this.formBuilder.group({
      numOificio: new FormControl('',[Validators.required]),
      remitente: new FormControl({disabled: true},[Validators.required]),
      destinatario : new FormControl('',[Validators.required]),
      otroDest : new FormControl('',[Validators.pattern('^[a-zA-Z]+$')]),
      fechaDoc: new FormControl('',[Validators.required]),
      fechaEnvio: new FormControl('',[Validators.required]),
      tipDoc: new FormControl('',[Validators.required]),
      asunto: new FormControl('',[Validators.required]),
      banexos: new FormControl('0', [Validators.required]),
      anexos: new FormControl('',[Validators.maxLength(250)]),
      bturnado: new FormControl('0',[Validators.required]),
      area: new FormControl(''),
      fechaTurnado: new FormControl(''),
      clasificacion: new FormControl('',[Validators.required]),
      tipoOficio: new FormControl('',[Validators.required]),
      observaciones: new FormControl('',[Validators.maxLength(250)])
    });
  }

  //Válidación para quitar comillas dobles y simples
  formatear(element: any){
    let atributo =  element.target.attributes.formcontrolname.nodeValue;
    
    if(atributo =='numOificio'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ numOificio : caracter});
    }else if(atributo == 'remitente'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ remitente : caracter});
    }else if(atributo == 'destinatario'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ destinatario : caracter});
    }else if(atributo == 'asunto'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ asunto : caracter});
    }else if(atributo == 'observaciones'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ observaciones : caracter});
    }else if(atributo == 'anexos'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      this.OfiInterno.patchValue({ anexos : caracter});
    }else if(atributo == 'otroDest'){
      let caracter = element.target.value;
      caracter = caracter.split("'").join(''); 
      caracter = caracter.split('"').join('');
      caracter = caracter.split('@').join('A');
      this.OfiInterno.patchValue({ otroDest : caracter});
    }
  }

  //Método que verifica el checked de anexos
  getAnexos($event) {
    if($event == 1){
      this.banexos = true;
      this.OfiInterno.get('anexos').setValidators([Validators.required]);
      this.OfiInterno.get('anexos').enable();
      this.OfiInterno.get('anexos').setValue('');
    } else {
      this.banexos = false;
      this.OfiInterno.get('anexos').disable();
      this.OfiInterno.get('anexos').setValue('');
    }
  }

  //Método que verifica el cheked del turnado
  getTurnado($event) {
    if($event == 1){
      this.banTurno = true;
      this.OfiInterno.get('area').setValidators([Validators.required]);
      this.OfiInterno.get('area').enable();

      this.OfiInterno.get('fechaTurnado').setValidators([Validators.required]);
      this.OfiInterno.get('fechaTurnado').enable();
    } 
    else {
      this.banTurno = false;

      this.OfiInterno.get('bturnado')?.valueChanges.subscribe((res)=>{
        this.OfiInterno.get('area')?.setValue('');
      });

      this.OfiInterno.get('bturnado')?.valueChanges.subscribe((res)=>{
        this.OfiInterno.get('fechaTurnado')?.setValue('');
      });

      this.OfiInterno.get('area').disable();
      this.OfiInterno.get('fechaTurnado').disable();
    }
  }

  //Método que verifica si el destinario es externo
  getDest($event) {
    if($event == 11) {
      this.OfiInterno.get('otroDest').setValidators([Validators.required]);
      this.OfiInterno.get('otroDest').patchValue('');
      this.OfiInterno.get('otroDest').enable();
      this.bodest = true;
    }
    else {
      this.OfiInterno.get('otroDest').patchValue('');
      this.OfiInterno.get('otroDest').disable();
      this.bodest = false;
    }
  }

  obtieneDatos() {
    //Obtiene los datos de Clasificación
    this._getDatosService.getClasificacion().subscribe(resulClas => {
      if(resulClas != null){
        this.clasificacion = resulClas;
      }
    });

    //Obtiene los datos del Tipo de oficio
    this._getDatosService.getTipoOficio().subscribe(resulTO => {
      if(resulTO != null){
        this.tipOficio = resulTO;
      }
    });

    //Obtiene los datos del Área
    this._getDatosService.getArea().subscribe(resulA => {
      if(resulA != null){
        this.area = resulA;
      }
    });

    //Obtiene los datos del Tipo de Docuemnto
    this._getDatosService.getTipoDoc().subscribe(resulTD => {
      if(resulTD != null){
        this.clasOficio = resulTD;
      }
    });

    //Obtiene los datos del Área mediante el id logueado
    let dat = {'idDir': this.idDL}
    this._getDatosService.postAreaN(dat).subscribe(resulAN => {
      if(resulAN != null) {
        this.areRemi = resulAN[0].direccion;
        this.OfiInterno.get('remitente').setValue(this.areRemi);
        this.OfiInterno.get('remitente').disable();
      }
    });

    //Obtiene los datos del Área para el Destinatario 
    this._getDatosService.getAreaD().subscribe(resulAD => {
      if(resulAD != null){
        this.areaDes = resulAD;
      }
    });
  }

  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {} 
    else if (output.type === 'addedToQueue') {
      //Se comprueba el tipo de archivo sea el correcto al requerido
      if(output.file.type.indexOf('pdf') > 0) {
        this.files = [];
        this.files.push(output.file);
      }
    }
    else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }

    //Se ejecuta el metodo que lee el archivo
    this.showFiles();
  }

  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }

  startUpload(): void {
    if(this.files.length == 1) {
      let form = new FormData();
      let archivo = this.files[0].nativeFile;
      form.append('file',archivo);
      form.append('dire',this.idDL);
      form.append('usu',this.idUsu);
      form.append('TipO',this.TOfi);

      this._up_doc.subirArchivo(form).subscribe(
        result => {
          // console.log(result);
          if(result.status) {
            //this.nameArchivo = result.generatedName;
            this.rutaArchivo = result.url.replace('C:/xampp/htdocs/Programas/ControlGestion/src/','../');
            this.archivo = this.files[0].name;
            this.files = [];
            //this.rutaArchivo = url_doc+'/'+this.nameArchivo;
            this.barchivo = true;

            this.GuardarDatos();
          }
        },
        err =>{
          console.log(err);
          alert('No se pudo cargar el archivo, intentalo de nuevo');

        });
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  GuardarDatos() {
    if(this.OfiInterno.invalid){
      return Object.values( this.OfiInterno.controls ).forEach( control => {
        if( control instanceof FormGroup){
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
      });
    }
    else {

      if(this.OfiInterno.value.banexos != 0) { this.anexo = this.OfiInterno.value.anexos} 
      else { this.anexo = null};
      if(this.OfiInterno.value.bturnado != 0) { this.areaT = this.OfiInterno.value.area; this.fechaT = this.OfiInterno.value.fechaTurnado;}
      else { this.areaT = this.idDL; this.fechaT = null;};
      if(this.OfiInterno.value.clasificacion != 2 ){ this.resol = 1; } else { this.resol= 2; };
      if(this.OfiInterno.value.destinatario != 11) { this.destinatario = this.OfiInterno.value.destinatario;  this.otroDestino = ''}
      else { this.destinatario = 0; this.otroDestino = this.OfiInterno.value.otroDest;}
    
      let datos = {
        IdOficio: this.OfiInterno.value.tipDoc,
        idClas: this.OfiInterno.value.clasificacion,
        idDir: this.areaT,
        idRes: this.resol,
        numOficio: this.OfiInterno.value.numOificio,
        remi: this.areRemi,
        dest: this.destinatario,
        otroDest: this.otroDestino,
        fDoc: this.OfiInterno.value.fechaDoc,
        fenvio: this.OfiInterno.value.fechaEnvio,
        asunto: this.OfiInterno.value.asunto,
        anexos: this.anexo,
        obs: this.OfiInterno.value.observaciones,
        bturno: this.OfiInterno.value.bturnado,
        fTurno: this.fechaT,
        archivoEnt: this.rutaArchivo,
        Idusu: this.idUsu,
        idTO: this.OfiInterno.value.tipoOficio,
      }

      //console.log(datos);

      this._insertOI.postInsertOI(datos).subscribe(resultIOI => {
        if(resultIOI.status){
          this.message = resultIOI.msg;
          this.status = true;
          this.action.next(resultIOI);
          setTimeout(() => {
            this.modalRef.hide();
          },1000);
        } 
        else if(!resultIOI.status){
          this.message = resultIOI.msg;
          this.status = true;
          this.action.next(resultIOI);
          this.resetForm();
        }else{
          this.message = 'No se pudo agregar el registro, intentelo mas tarde.';
          setTimeout(() => {
            this.modalRef.hide();
          },1000);
        }
      },err =>{
        console.log(err);
      });

      // console.log(this.OfiInterno.value);
      // console.log(this.rutaArchivo);
    }
    
  }

  resetForm(){
    this.OfiInterno.reset({
      numOificio: '' ,
      remitente: '',
      destinatario : '',
      fechaDoc: '',
      fechaEnvio: '',
      tipDoc:'',
      asunto: '',
      banexos: '',
      anexos: '',
      bturnado: '',
      area: '',
      fechaTurnado: '',
      clasificacion: '',
      tipoOficio: '',
      observaciones: ''
    });
  }

  //Válidaciones
  get num_OfNoValido(){
    return this.OfiInterno.get('numOificio')?.invalid && this.OfiInterno.get('numOificio')?.touched
  }

  get remitNoValido(){
    return this.OfiInterno.get('remitente')?.invalid && this.OfiInterno.get('remitente')?.touched
  }

  get DestNoValido(){
    return this.OfiInterno.get('destinatario')?.invalid && this.OfiInterno.get('destinatario')?.touched
  }

  get ODestNoValido(){
    return this.OfiInterno.get('otroDest')?.invalid && this.OfiInterno.get('otroDest')?.touched
  }

  get FDocNoValido(){
    return this.OfiInterno.get('fechaDoc')?.invalid && this.OfiInterno.get('fechaDoc')?.touched
  }

  get FEnvioNoValido(){
    return this.OfiInterno.get('fechaEnvio')?.invalid && this.OfiInterno.get('fechaEnvio')?.touched
  }

  get clasOficioNoValido(){
    return this.OfiInterno.get('tipDoc')?.invalid && this.OfiInterno.get('tipDoc')?.touched
  }

  get asuntoNoValido(){
    return this.OfiInterno.get('asunto')?.invalid && this.OfiInterno.get('asunto')?.touched
  }

  get anexoNoValido(){
    return this.OfiInterno.get('anexos')?.invalid && this.OfiInterno.get('anexos')?.touched
  }
  
  get areaNoValido(){
    return this.OfiInterno.get('area')?.invalid && this.OfiInterno.get('area')?.touched
  }

  get FTNoValido(){
    return this.OfiInterno.get('fechaTurnado')?.invalid && this.OfiInterno.get('fechaTurnado')?.touched
  }
 
  get clasNoValido(){
    return this.OfiInterno.get('clasificacion')?.invalid && this.OfiInterno.get('clasificacion')?.touched
  }

  get TOficioNoValido(){
    return this.OfiInterno.get('tipoOficio')?.invalid && this.OfiInterno.get('tipoOficio')?.touched
  }

  
}
