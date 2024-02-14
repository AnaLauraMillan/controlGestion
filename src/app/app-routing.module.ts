import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Admin',
    loadChildren:()=> import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'CG',
    loadChildren:()=> import('./cgestion/cgestion.module').then(cg => cg.CgestionModule)
  },
  {
    path: 'Direccion',
    loadChildren:()=> import('./direccion/direccion.module').then(d => d.DireccionModule)
  },
  {
    path: 'Mensajeria',
    loadChildren:()=> import('./mensajeria/mensajeria.module').then(m => m.MensajeriaModule)
  },
  { path: '**', redirectTo:'login' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

