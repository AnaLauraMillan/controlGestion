import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentariosService } from '../servicios/comentarios.service';
import { MDBModalRef, MDBModalService,  } from 'ng-uikit-pro-standard';
import { DeleteComComponent } from '../modal-Delete-Com/delete-com/delete-com.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})

export class ComentariosComponent implements OnInit{
  
  id_articulo:any;
  elementsC: any = [];
  headElements = ['#', 'Autor', 'Comentario', 'Fecha', 'Aprobar Comentario', 'Total de Respuestas', '', ''];
  modalRef: MDBModalRef | null = null;

  pageSize = 20;  // Cantidad de elementos por página
  currentPage = 1; // Página actual, inicializada en 1

  constructor(private rutaActiva: ActivatedRoute, private dataService: ComentariosService, private modalService: MDBModalService, private router: Router){}

  ngOnInit(): void { 
    this.id_articulo = this.rutaActiva.snapshot.params.id_articulo;
    let dat = { id_articulo: this.id_articulo };
    this.dataService.postComentarios(dat).subscribe(result =>{
      if(result != null){
        this.elementsC = result;
        this.currentPage = 1; // Reset a la primera página cuando los datos se cargan  
      } else{
        this.router.navigateByUrl(`Admin/Inicio/(Secc:Articulos)`);
      }  
    },err =>{
      console.log(err);
    });
  }

  toggleAutorizacion(item: any) {
    item.autorizacion = item.autorizacion === "1" ? "0" : "1"; // Cambiar el valor de autorizacion
    item.shouldHighlight = item.autorizacion === "1"; // Actualizar en el nuevo valor de autorizacion
    let datos = { 
      id_articulo: item.id_articulo,
      id_comentario: item.id_comentario,
      autorizacion: item.autorizacion,
      nombre_articulo: item.nombre_articulo,
      autor: item.autor
    };
    this.dataService.postAutorizarCom(datos).subscribe(resultAC =>{
      
    });
  }

  eliminar(id: number) {
    this.confirmModal('¿Seguro que desea eliminar el comentario?', id, 'eliminarComentario' );
  }

  confirmModal( mensaje, datos:any, php ) {
    this.modalRef = this.modalService.show(DeleteComComponent, 
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
      if (result.status) {
        const dat = { id_articulo: this.id_articulo };
        this.dataService.postComentarios(dat).subscribe((updatedComments) => {
          if (updatedComments != null) {
            this.elementsC = updatedComments;
    
            if (this.currentPage > this.totalPages) {
              // Si la página actual supera el total de páginas actualizadas, vuelva a la última página
              this.currentPage = this.totalPages;
            }
    
            // Opcionalmente, puede volver a la página original si la página actual está vacía.
            if (this.pagedComments.length === 0) {
              this.currentPage = originalPage;
            }
          } else {
            this.router.navigateByUrl(`Admin/Inicio/(Secc:Articulos)`);
          }
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  calculateRowNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }

  get pagedComments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.elementsC.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  get totalPages() {
    return Math.ceil(this.elementsC.length / this.pageSize);
  }
  
  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }  

}