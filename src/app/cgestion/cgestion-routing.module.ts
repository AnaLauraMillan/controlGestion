import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CgestionComponent } from './cgestion.component';

import { AuthGuard } from '../guards/auth.guard';
import { controlGestionGuard } from '../guards/control-gestion.guard';
import { PrincipalCGestionComponent } from './principal-cgestion/principal-cgestion.component';


const routes: Routes = [
  {
    path:'Inicio', component: CgestionComponent,canActivate: [ AuthGuard, controlGestionGuard ],
    children:[
      { path: 'ControlGestion', component: PrincipalCGestionComponent,outlet: "Secc",canActivate: [ AuthGuard, controlGestionGuard ]},
    //   { path: 'Comentarios/:id_articulo', component: ComentariosComponent,outlet: "Secc",canActivate: [ AuthGuard, AdmGGuard ]},
    //   { path: 'Respuestas/:id_articulo/:id_comentario', component: RespuestasComponent,outlet: "Secc",canActivate: [ AuthGuard, AdmGGuard ]},
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CgestionRoutingModule { }