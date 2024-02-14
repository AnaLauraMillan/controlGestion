import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CgestionRoutingModule } from './cgestion-routing.module';
import { CgestionComponent } from './cgestion.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrincipalCGestionComponent } from './principal-cgestion/principal-cgestion.component';


@NgModule({
    declarations: [
        CgestionComponent,
        PrincipalCGestionComponent,
    ],
    imports: [
      CommonModule,
      CgestionRoutingModule,
        SharedModule,
        MDBBootstrapModulesPro.forRoot(),
        ReactiveFormsModule,
        FormsModule,
    ],
    entryComponents: [ ],
    schemas:      [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
})

export class CgestionModule { }