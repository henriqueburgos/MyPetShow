import { Component, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AdmService } from 'src/app/shared/services/adm.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
usuarios$?:any
  constructor(private adm: AdmService) { }
deleteUser(uid:string){
this.adm.deleteUser(uid)
}
sub?:Subscription
  ngOnInit(): void {
  
 this.sub= this.adm.getUser().pipe(
    tap(
      (resposta)=>{
        this.usuarios$= resposta
console.log(this.usuarios$)
      }
    )
  ).subscribe()

}
ngOndestroy(){
  this.sub?.unsubscribe()
}
}
