import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Console } from 'console';
import { Timestamp } from 'firebase/firestore';
import { url } from 'inspector';
import { finalize, Observable, takeLast, tap, timestamp } from 'rxjs';
import { Login } from 'src/app/shared/models/login';
import { AdmService } from 'src/app/shared/services/adm.service';

@Component({
  selector: 'app-fotos-login',
  templateUrl: './fotos-login.component.html',
  styleUrls: ['./fotos-login.component.scss']
})
export class FotosLoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private adm:AdmService) { }

  cadastrarFotos= this.fb.group(
    {
      
      creditos: ['',[Validators.required]]
    }
  )
processoConcluido$?:boolean
enviando?:boolean=false
imagem?:File

  setImage(ev: any) {
    this.imagem = ev.target.files[0];
    console.log(this.imagem)
  }

  upload(){
    this.processoConcluido$=false
    this.enviando=true
    const filePath = `fotosLogin/${this.imagem?.name}`;
    const ref= this.storage.ref(filePath)
   this.storage.upload(filePath,this.imagem).then(a=> a.ref.getDownloadURL().then(url=> {
    let login:Login={
      comentario:this.cadastrarFotos.get('creditos')?.value,
      url:url,       
    }
    console.log(login)
    this.adm.addFirestore(login,this.imagem!.name).then( a=>this.processoConcluido$=true).catch(error=> console.log(error))
   
  }
  )
   )
}
  ngOnInit(): void {
  }

}
