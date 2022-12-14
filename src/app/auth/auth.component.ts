import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { resolve } from 'dns';
import { map, Observable, shareReplay, Subscription, tap } from 'rxjs';
import { Login } from '../shared/models/login';
import { Usuario } from '../shared/models/usuario';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
 
  tipo!:string;
  arrayimg?:any[]
  user?:any
  sub?:Subscription
  sub2?:Subscription
  sub3?:Subscription
  errorPassword=0
  block=false
  progresso1 = 0;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private auth:AuthService,
    private afAuth:AngularFireAuth,
    private ht: HotToastService,
    private elemento: ElementRef,
    private router:Router
  ) {}
  

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
        (a)=>{
           this.ht.success("usuario criado" + a)
           console.log("Caiu na promisse")
           console.timeLog('cadastro')
          this.cadastroForm.reset()
      }
      )
      this.afAuth.signOut()
      this.ht.success("usuario criado" )
      this.cadastroForm.reset()
      this.cadastroForm.clearValidators()
      this.progresso1=0
      
  
    }
   


    login(){
      let email = this.loginForm.get('email')?.value;
      let senha = this.loginForm.get('senha')?.value;
    this.auth.onLogin(email,senha).then(
        user=>{
          let admin1:boolean
          this.sub2= this.auth.verifytoken().subscribe( a=> {
              a?.getIdTokenResult().then(
                b=>{
                if(b?.claims['admin']){
                admin1=b?.claims['admin'].includes('true')
                console.log("existe o b")
                }else{
                  console.log("nao existe o b")
                  admin1=false
                }
                }
              ).then(b=>{
                console.log(b)
                this.sub?.unsubscribe()
                this.elemento.nativeElement.ownerDocument.body.style.background="none"
                 if(admin1){
                  
                  this.ht.success("Bem vindo admin, " + user.user?.email)
                  this.router.navigate(['adm/fotos-login'])
                  
                }else{
                this.ht.success("Ol??, " + user.user?.email)  
                this.router.navigate(['/usuario/feed'])}
            })             
            })  
        }
      ).then(a=>{ ;console.log("Cancelou") })
      .catch(
        error=>{
          if(error.code){
            switch(error.code){
               case 'auth/user-not-found':
                this.ht.error("Usuario n??o encontrado")
               break
               case 'auth/wrong-password':
                this.errorPassword++
                this.ht.error("Senha invalida")
                if(this.errorPassword>3){
                  this.ht.error("Voc?? esgotou o limite de tentativas")
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

    onClikgoogle(){
      this.auth.onloginGoogle()
    }

  
    ngOnInit(): void {
      this.sub=this.auth.getpic().pipe( 
           tap(b=>{
          if(this.breakpointObserver.isMatched(Breakpoints.Handset)){
               console.log("caiu aqui")
             this.sub3=  this.auth.getpicmobile().pipe( 
                 tap( (mobile)=>{
                   console.log("caiu aqui1")
                   let picmobile:Login[]=mobile
                   this.elemento.nativeElement.ownerDocument.body.style.background=`url(${picmobile[(Math.floor(Math.random()*picmobile.length))].url})`
                   this.elemento.nativeElement.ownerDocument.body.style.backgroundSize="auto"
                 })
              ).subscribe()
     
             }else{
               console.log("ihuapululo");
               let array:Login[]=b
               this.elemento.nativeElement.ownerDocument.body.style.background=`url(${array[(Math.floor(Math.random()*array.length))].url})` // AQUI ?? O PAPEL 
            
             this.elemento.nativeElement.ownerDocument.body.style.backgroundSize="cover"
             }
           })
         ).subscribe(a=> this.arrayimg=a)
         
         
       this.afAuth.authState.subscribe(a=> this.user=a);
       this.tipo='dark'
         
       }


    ngOnDestroy(){
         this.sub?.unsubscribe()
         this.sub2?.unsubscribe()
         this.sub3?.unsubscribe()
         this.elemento.nativeElement.ownerDocument.body.style.background="none"
       }
       
   

  }
  
