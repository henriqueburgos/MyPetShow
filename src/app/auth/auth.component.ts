import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../shared/models/usuario';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  
  tipo!:string;
    image = [
      'https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_960_720.jpg',
      'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg',
      'https://cdn.pixabay.com/photo/2016/10/21/14/46/fox-1758183_960_720.jpg',
    ];
    cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.minLength(8)]],
        dataNasci: ['', [Validators.required]],
        nickName: [''],
      },
   
    );
  
    loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.minLength(8)]],
      },
   
    );
    
    progresso() {
    this.tipo='dark'
      let progresso1 = 0;
      if (this.cadastroForm.get('nome')?.valid) progresso1 = progresso1 + 25;
      if (this.cadastroForm.get('email')?.valid) progresso1 = progresso1 + 25;
      if (this.cadastroForm.get('senha')?.valid) progresso1 = progresso1 + 25;
      if (this.cadastroForm.get('dataNasci')?.valid) progresso1 = progresso1 + 25;
  if(progresso1==100) this.tipo="success"
      return progresso1;
    }
  
    onSubmit(){
      let user:Usuario = {... this.cadastroForm.value, dataCad: new Date()}
      console.log(user)
      this.auth.onsubmit(user.email,user.senha,user)
      console.log("usuario criado" + user)
  
    }
  
    onClikgoogle(){
      this.auth.onloginGoogle()
    }
    constructor(
      private fb: FormBuilder,
      private auth:AuthService,
      private afAuth:AngularFireAuth
    ) {}
  user?:any
  
    ngOnInit(): void {
    this.afAuth.authState.subscribe(a=> this.user=a)
      
    }
  
    images = [62, 83, 466, 965, 982, 1043, 738].map(
      (n) => `https://picsum.photos/id/${n}/900/500`
    );
  }
  
