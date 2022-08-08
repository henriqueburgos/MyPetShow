import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosLoginComponent } from './fotos-login/fotos-login.component';

const routes: Routes = [
  {
    path:'adm',
    children:[
      {
        path:'fotos-login',
        component:FotosLoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
