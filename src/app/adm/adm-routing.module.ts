import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { LogadoGuard } from '../shared/guards/logado.guard';
import { AdmComponent } from './adm.component';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';
import { PerfilLogadoComponent } from './usuarios/perfil-logado/perfil-logado.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'adm',
    component:AdmComponent,
    canActivate:[LogadoGuard],
    children:[
      {
        path:'fotos-login',
        component:FotosLoginComponent
      },
      {
        path:'usuario',
        component:UsuariosComponent
      },
      {
        path:"perfil",
        component:PerfilLogadoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
