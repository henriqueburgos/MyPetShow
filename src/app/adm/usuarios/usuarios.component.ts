import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription, tap } from 'rxjs';
import { Usuario } from 'src/app/shared/models/usuario';
import { AdmService } from 'src/app/shared/services/adm.service';
import { DadosUserComponent } from './dados-user/dados-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
usuarios$?:any
  constructor(
    private adm: AdmService,
    private ht :HotToastService, 
    private dialog: MatDialog,
    ) { }

deleteUser(uid:Usuario){
  this.dialog.open(DeleteUserComponent,{width:'80%', height:'80%',data:{
    ...uid
  }})
  .afterClosed().subscribe(a=>{
    if(a){
      this.ht.success("usuario deletado com sucesso")
      return this.adm.deleteUser(uid)
    }
    return console.log("tudo bem ")
  })


}
setAdmin(uid:Usuario){
return this.adm.setAdmin(uid);
}
token?:{}
getToken(uid:Usuario){
 
  this.adm.getToken(uid).subscribe(
    (a)=>{
      this.token=a
      this.dialog.open(DadosUserComponent,{ width:'90%', height:'90%',data:{token:this.token}})
    }
  )

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
