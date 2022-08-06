import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbDatepickerModule, NgbProgressbar, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [

    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
  
  ],
  providers: [NgbProgressbar],
})
export class AuthModule { }
