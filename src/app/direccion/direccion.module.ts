import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DireccionRoutingModule } from './direccion-routing.module';
import { DireccionComponent } from './direccion.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrincipalVistaComponent } from './principal-vista/principal-vista.component';
import { ModalOInternoComponent } from './modals/modal-ointerno/modal-ointerno.component';
import { ModalDetallesIComponent } from './modals/modal-detalles-i/modal-detalles-i.component';

@NgModule({
    declarations: [
        DireccionComponent,
        PrincipalVistaComponent,
        ModalOInternoComponent,
        ModalDetallesIComponent,
    ],
    imports: [
      CommonModule,
      DireccionRoutingModule,
        SharedModule,
        MDBBootstrapModulesPro.forRoot(),
        ReactiveFormsModule,
        FormsModule,
    ],
    entryComponents: [ ],
    schemas:      [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
})

export class DireccionModule { }