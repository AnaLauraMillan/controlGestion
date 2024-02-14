import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MensajeriaComponent } from "./mensajeria.component";
import { AuthGuard } from "../guards/auth.guard";
import { mensajeriaGuard } from "../guards/mensajeria.guard";
import { MensajeriaPrincipalComponent } from "./mensajeria-principal/mensajeria-principal.component";

const routes: Routes = [
    {
      path:'Inicio', component: MensajeriaComponent,canActivate: [ AuthGuard, mensajeriaGuard ],
      children:[
       { path: 'Mensajeria', component: MensajeriaPrincipalComponent,outlet: "Secc",canActivate: [ AuthGuard, mensajeriaGuard ]},
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class MensajeriaRoutingModule { }

