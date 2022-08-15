import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogadoGuard } from '../shared/guards/logado.guard';
import { AreaUsuarioComponent } from './area-usuario/area-usuario.component';
import { FeedComponent } from './feed/feed.component';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';

const routes: Routes = [
  
  {
    path:'usuario',
    component: NavbarUsuarioComponent ,
    canActivate:[LogadoGuard],
  children:[
    {
      path:'feed',
      component: FeedComponent
      
  }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
