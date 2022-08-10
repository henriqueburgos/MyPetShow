import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './adm.component';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'adm',
    component:AdmComponent,
    children:[
      {
        path:'fotos-login',
        component:FotosLoginComponent
      },
      {
        path:'usuario',
        component:UsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
