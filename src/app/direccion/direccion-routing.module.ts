import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionComponent } from './direccion.component';
import { AuthGuard } from '../guards/auth.guard';
import { direccionGuard } from '../guards/direccion.guard';
import { PrincipalVistaComponent } from './principal-vista/principal-vista.component';

const routes: Routes = [
    {
      path:'Inicio', component: DireccionComponent,canActivate: [ AuthGuard, direccionGuard ],
      children:[
       { path: 'Area', component: PrincipalVistaComponent,outlet: "Secc",canActivate: [ AuthGuard, direccionGuard ]},
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DireccionRoutingModule { }