import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AdmComponent } from './adm.component';
import { AdmNavbarComponent } from './adm-navbar/adm-navbar.component';
import { FotoInteiraComponent } from './fotos-login/foto-inteira/foto-inteira.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    FotosLoginComponent,
    AdmComponent,
    AdmNavbarComponent,
    FotoInteiraComponent,
    UsuariosComponent
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
