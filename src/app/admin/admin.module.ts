import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPrincipalComponent } from './admin-principal/admin-principal.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPrincipalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MDBBootstrapModulesPro.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    
  ],
  entryComponents: [ ],
  schemas:      [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
})
export class AdminModule { }
