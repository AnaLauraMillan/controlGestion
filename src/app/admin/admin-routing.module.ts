import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdmGGuard } from '../guards/adm-g.guard';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';
const routes: Routes = [
  {
    path:'Inicio', component: AdminComponent,canActivate: [ AuthGuard, AdmGGuard ],
    children:[
      { path: 'Articulos', component: AdminPrincipalComponent,outlet: "Secc",canActivate: [ AuthGuard, AdmGGuard ]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
