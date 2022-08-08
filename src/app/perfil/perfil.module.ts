import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { AreaUsuarioComponent } from './area-usuario/area-usuario.component';
import { CoreModule } from '../core/core.module';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';
import { MaterialModule } from '../shared/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AreaUsuarioComponent,
    NavbarUsuarioComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    CoreModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class PerfilModule { }
