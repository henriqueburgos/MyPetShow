import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaUsuarioComponent } from './area-usuario/area-usuario.component';

const routes: Routes = [
  {
    path:'area-usuario',
    component: AreaUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
