import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    FotosLoginComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbProgressbarModule
  ]
})
export class AdmModule { }
