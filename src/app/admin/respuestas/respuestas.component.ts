import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RespuestasService } from '../servicios/respuestas.service';
import { MDBModalRef, MDBModalService,  } from 'ng-uikit-pro-standard';
import { DeleteRespComponent } from '../modal-Delete-Resp/delete-resp/delete-resp.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.scss']
})

export class RespuestasComponent implements OnInit{
   
  id_articulo:any;
  id_comentario:any;
  elementsR: any = [];
  headElements = ['#', 'Autor', 'Respuesta', 'Fecha', 'Aprobar Respuesta', '', ''];
  modalRef: MDBModalRef | null = null; 

  pageSize = 20;  // Cantidad de elementos por página
  currentPage = 1; // Página actual, inicializada en 

  constructor(private rutaActiva: ActivatedRoute, private dataService:RespuestasService, private modalService: MDBModalService, private router: Router){}

  ngOnInit(): void {
    this.id_articulo = this.rutaActiva.snapshot.params.id_articulo;
    this.id_comentario = this.rutaActiva.snapshot.params.id_comentario;
    let dat = { id_articulo: this.id_articulo, id_comentario:this.id_comentario };
    this.dataService.postRespuestas(dat).subscribe(result =>{
      if(result != null){
        this.elementsR = result;  
        this.currentPage = 1; // Reset a la primera página cuando los datos se cargan   
      } else{
        this.router.navigateByUrl(`Admin/Inicio/(Secc:Articulos)`);
      }
    },err =>{
      console.log(err);
    });
  }
 
  toggleAutorizacion(item: any) {
    // item.autorizacion = item.autorizacion == 1 ? 0 : 1;
    item.autorizacion = item.autorizacion === "1" ? "0" : "1"; // Cambiar el valor de autorizacion
    item.shouldHighlight = item.autorizacion === "1"; // Actualizar en el nuevo valor de autorizacion
    let datos = { 
      id_comentario: item.id_comentario,
      id_articulo: item.id_articulo,
      id_respuesta: item.id_respuesta,
      autorizacion: item.autorizacion,
      nombre_articulo: item.nombre_articulo,
      autor: item.autor
    };
    this.dataService.postAutorizarResp(datos).subscribe(resultAR =>{
      
    });
  }

  eliminar(id: number) {
    this.confirmModal('¿Seguro que desea eliminar la respuesta?', id, 'eliminarRespuesta' );
  }

  confirmModal( mensaje, datos:any, php ) {
    this.modalRef = this.modalService.show(DeleteRespComponent, 
    {
      data: { mensaje: mensaje, contenido: datos, php: php },
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true,
      ignoreBackdropClick: true,
      animated: true
    }); 
  
    this.modalRef.content.action.subscribe((result: any) => { 
      const originalPage = this.currentPage; // Almacena la página de la paginación actual
      if(result.status && this.elementsR != ''){
        let dat = { id_articulo: this.id_articulo, id_comentario:this.id_comentario };
        this.dataService.postRespuestas(dat).subscribe((updatedRespuestas) =>{
          if (updatedRespuestas != null) {
            this.elementsR = updatedRespuestas;
    
            if (this.currentPage > this.totalPages) {
              // Si la página actual supera el total de páginas actualizadas, vuelva a la última página
              this.currentPage = this.totalPages;
            }
    
            // Opcionalmente, puede volver a la página original si la página actual está vacía.
            if (this.pagedRespuestas.length === 0) {
              this.currentPage = originalPage;
            }
          } else {
            this.router.navigateByUrl(`Admin/Inicio/(Secc:Comentarios/${this.id_articulo})`);
          }

        },err =>{
          console.log(err);
        });
      }
    }); 
  }

  calculateRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  get pagedRespuestas() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.elementsR.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  get totalPages() {
    return Math.ceil(this.elementsR.length / this.pageSize);
  }
  
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


}