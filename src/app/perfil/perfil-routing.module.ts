import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaUsuarioComponent } from './area-usuario/area-usuario.component';
import { FeedComponent } from './feed/feed.component';
import { NavbarUsuarioComponent } from './navbar-usuario/navbar-usuario.component';

const routes: Routes = [
  
  {
    path:'usuario',
    component: NavbarUsuarioComponent ,
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
