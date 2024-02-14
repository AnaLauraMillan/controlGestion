import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajeriaRoutingModule } from './mensajeria-routing.module';
import { MensajeriaComponent } from './mensajeria.component';
import { SharedModule } from '../shared/shared.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensajeriaPrincipalComponent } from './mensajeria-principal/mensajeria-principal.component';

@NgModule({
    declarations: [
        MensajeriaComponent,
        MensajeriaPrincipalComponent,
    ],
    imports: [
        CommonModule,
        MensajeriaRoutingModule,
        SharedModule,
        MDBBootstrapModulesPro.forRoot(),
        ReactiveFormsModule,
        FormsModule,
    ],
    entryComponents: [ ],
    schemas:      [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
})

export class MensajeriaModule { }