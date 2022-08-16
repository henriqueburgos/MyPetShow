import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Console } from 'console';
import { Timestamp } from 'firebase/firestore';
import { url } from 'inspector';
import { finalize, Observable, Subscription, takeLast, tap, timestamp } from 'rxjs';
import { Login } from 'src/app/shared/models/login';
import { AdmService } from 'src/app/shared/services/adm.service';
import { DeletarFotoComponent } from './deletar-foto/deletar-foto.component';
import { FotoInteiraComponent } from './foto-inteira/foto-inteira.component';

@Component({
  selector: 'app-fotos-login',
  templateUrl: './fotos-login.component.html',
  styleUrls: ['./fotos-login.component.scss']
})
export class FotosLoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
     private storage: AngularFireStorage, 
    private adm:AdmService,
     private ht :HotToastService, 
     private dialog: MatDialog,
     private elemento: ElementRef,) { }

  cadastrarFotos= this.fb.group(
    {
      mobile: ['',[Validators.required]],
      creditos: ['',[Validators.required]]
    }
  )
fotosLogin$?:any;
processoConcluido$?:boolean
enviando?:boolean=false
imagem?:File
nomeImg?:string
preEnvio=false
  setImage(ev: any) {
    this.imagem = ev.target.files[0];
this.nomeImg=this.imagem?.name
    this.classe='btn-success'
    this.txtbutton='Foto adicionada!'
    this.preEnvio=true
  }
  resetimg(){
    console.log(this.imagem)
    this.imagem= undefined;
    this.txtbutton='Adicionar foto';
    this.classe='btn-primary';
    this.preEnvio=false
    console.log(this.imagem)
  }

  sub?:Subscription
  txtbutton='Adicionar foto'
classe:string='btn-primary'
  upload(){
    this.processoConcluido$=false
    this.enviando=true
    
    const filePath = `fotosLogin/${this.imagem?.name}`;
    const ref= this.storage.ref(filePath)
   this.storage.upload(filePath,this.imagem).then(a=> a.ref.getDownloadURL().then(url=> {
    let login:Login={
      responsividade :this.cadastrarFotos.get('mobile')?.value,
      comentario:this.cadastrarFotos.get('creditos')?.value,
      url:url,       
    }
    console.log(login)
    this.adm.addFirestore(login,this.imagem!.name).then( a=>
      { this.ht.success("Imagem cadastrada no banco de dados")
        this.processoConcluido$= undefined
        this.enviando=false
        this.preEnvio=false
       this.txtbutton='Adicionar foto'
       this.classe='btn-primary'
       this.cadastrarFotos.reset()
    }).catch(error=> console.log(error))
   
  }
  )
   )
}
deletefile(file:Login){
  this.dialog.open(DeletarFotoComponent,{width:'80%', height:'80%',data:{
    ...file
  }})
  .afterClosed().subscribe(a=>{
    if(a){
  this.storage.refFromURL(file.url).delete().subscribe(a=>console.log('deu certo'))
  this.adm.deletepic(file.uid!)
}
return console.log("tudo bem ")
}
)
}
  ngOnInit(): void {
    this.elemento.nativeElement.ownerDocument.body.style.background='withe'
  this.sub=  this.adm.getpic().pipe(
      tap(
        (resposta)=>{
          this.fotosLogin$= resposta
console.log(this.fotosLogin$)
        }
      )
    ).subscribe()
  }

  ngOnDestroy(){
    
    this.sub?.unsubscribe()
  }
clickDialog(arquivo:Login){
  this.dialog.open(FotoInteiraComponent, { maxWidth: '512px',maxHeight:'512px',
    data:{
      ...arquivo
    }
  }
  )

}

}
