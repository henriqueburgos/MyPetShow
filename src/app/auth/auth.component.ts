import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Validators, FormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
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
        senha: ['', [Validators.minLength(8),Validators.required]],
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
   progresso1 = 0;
    block=false
    progresso() {
    this.tipo='dark'
      this.progresso1 = 0;
      if (this.cadastroForm.get('nome')?.valid) this.progresso1 = this.progresso1 + 25;
      if (this.cadastroForm.get('email')?.valid)  this.progresso1 = this.progresso1+ 25;
      if (this.cadastroForm.get('senha')?.valid) this.progresso1 = this.progresso1+ 25;
      if (this.cadastroForm.get('dataNasci')?.valid)  this.progresso1 = this.progresso1 + 25;
  if(this.progresso1==100) this.tipo="success"
      return  this.progresso1;
    }
  
    onSubmit(){
      let user:Usuario = {... this.cadastroForm.value, dataCad: new Date()}
     console.time('cadastro')
      this.auth.onsubmit(user.email,user.senha,user).then(
        ()=>{
           console.log("usuario criado" + user)
           console.log("Caiu na promisse")
           console.timeLog('cadastro')
          this.cadastroForm.reset()
      }
      )
      this.cadastroForm.reset()
      this.cadastroForm.clearValidators()
      this.progresso1=0
      
  
    }
  
    onClikgoogle(){
      this.auth.onloginGoogle()
    }
    constructor(
      private fb: FormBuilder,
      private auth:AuthService,
      private afAuth:AngularFireAuth,
      private ht: HotToastService
    ) {}
  user?:any
  
    ngOnInit(): void {
    this.afAuth.authState.subscribe(a=> this.user=a);
    this.tipo='dark'
      
    }
    errorPassword=0
    images = [62, 83, 466, 965, 982, 1043, 738].map(
      (n) => `https://picsum.photos/id/${n}/900/500`
    );

    login(){
      let email = this.loginForm.get('email')?.value;
      let senha = this.loginForm.get('senha')?.value;
      this.auth.onLogin(email,senha).then(
        user=>{
          this.ht.success("Olá, " + user.user?.email)


        }
      ).catch(
        error=>{
          if(error.code){
            switch(error.code){
               case 'auth/user-not-found':
                this.ht.error("Usuario não encontrado")
               break
               case 'auth/wrong-password':
                this.errorPassword++
                this.ht.error("Senha invalida")
                if(this.errorPassword>3){
                  this.ht.error("Você esgotou o limite de tentativas")
                  this.block=true
                }
               break
               case 'auth/too-many-requests':
                this.block=true
                this.ht.error("Sua conta foi temporariamente bloqueada")
                
               break
            }
          }
        }
      )
    }
    recuperar(){
      this.auth.recoverPassword(this.loginForm.get('email')?.value)
    }
  }
  
