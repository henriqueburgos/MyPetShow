import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmRoutingModule } from './adm/adm-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PerfilRoutingModule } from './perfil/perfil-routing.module';

const routes: Routes = [
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PerfilRoutingModule,
    AdmRoutingModule
  ],
  exports: [RouterModule, ]
})
export class AppRoutingModule { }
