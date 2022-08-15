import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Usuario } from '../models/usuario';
import { GoogleAuthProvider, User, UserProfile } from "firebase/auth";
import { HotToastService } from '@ngneat/hot-toast';
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { Router } from '@angular/router';
@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private google:GoogleAuthProvider,
    private afauth: AngularFireAuth,
    private db: AngularFirestore,
    private ht: HotToastService,
    private router :Router

  ) { }

   functions = getFunctions(getApp());
   conected= connectFunctionsEmulator(this.functions, "localhost", 5001);
   

  onloginGoogle(): void{
    this.afauth.signInWithPopup(this.google).then(
    (user)=>{
      let user1=user.user
      this.db.collection("Usuario").doc(user1?.uid).set({
        uid:user1?.uid,
         nome:user1?.displayName,
         email: user1?.email,
         dataCad: new Date()
        
      })
    }
    )

  }

  onsubmit(email:string,senha:string, user1:Usuario){
    return new Promise( ()=>
    this.afauth.createUserWithEmailAndPassword(email,senha).then(
      usuario=> {
        console.log(usuario)
      let user=usuario.user
      console.log(user);
        
        this.db.collection("Usuario").doc(user?.uid).set({
         uid:user?.uid,
          nome:user1.nome,
          email: user?.email,
          dataCad: user1.dataCad,
          dataNasci: user1.dataNasci
       })
      }
    )
    .catch(error=>  {
        console.log(error)
        if(error.code){
          switch(error.code){
            case "auth/email-already-in-use":
this.ht.error("Email já registrado na aplicação!")
            break;
            case "auth/account-exists-with-different-credential":
              
            break;
          }
          console.log(error.code)
        }
    
  }
    ))
  }
verifytoken(){
  return this.afauth.authState
    
    
  }


onLogin(email:string,senha:string){
 return this.afauth.signInWithEmailAndPassword(email,senha)

}
recoverPassword(email:string){
  this.afauth.sendPasswordResetEmail(email)
}

getpic(){
  return this.db.collection("FotosLogin").valueChanges()
  }

getStateUser(){
return this.afauth.currentUser.then((a)=> {
    if(a){
      console.log('false')
        this.ht.error("você está logado")

      return false
    }
    console.log('verdadeiro')
    return true
  })

}
getStateUserlogin(){
return this.afauth.currentUser.then((a)=> {
    if(a){
      console.log(a)
      console.log('true')
      return true
    }console.log(a)
    console.log('false')
    this.router.navigate([''])
    this.ht.error("você não tem acesso")
    return false
  })

}
}


