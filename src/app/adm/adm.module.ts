import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { NgbOffcanvasModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AdmComponent } from './adm.component';
import { AdmNavbarComponent } from './adm-navbar/adm-navbar.component';
import { FotoInteiraComponent } from './fotos-login/foto-inteira/foto-inteira.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeleteUserComponent } from './usuarios/delete-user/delete-user.component';
import { DadosUserComponent } from './usuarios/dados-user/dados-user.component';
import { PerfilLogadoComponent } from './usuarios/perfil-logado/perfil-logado.component';
import { DeletarFotoComponent } from './fotos-login/deletar-foto/deletar-foto.component';


@NgModule({
  declarations: [
    FotosLoginComponent,
    AdmComponent,
    AdmNavbarComponent,
    FotoInteiraComponent,
    UsuariosComponent,
    DeleteUserComponent,
    DadosUserComponent,
    PerfilLogadoComponent,
    DeletarFotoComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbProgressbarModule,
    HttpClientModule,
    NgbOffcanvasModule
  ]
})
export class AdmModule { }
