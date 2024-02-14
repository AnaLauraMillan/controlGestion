import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro.forRoot(),
    RouterModule
  ],
  exports:[SidebarComponent, NavbarComponent],
})
export class SharedModule { }
