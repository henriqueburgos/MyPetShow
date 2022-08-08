import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Usuario } from '../models/usuario';
import { GoogleAuthProvider } from "firebase/auth";
import { HotToastService } from '@ngneat/hot-toast';
import { Login } from '../models/login';
@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private google:GoogleAuthProvider,
    private afauth: AngularFireAuth,
    private db: AngularFirestore,
    private ht: HotToastService
  ) { }



  onloginGoogle(){
    this.afauth.signInWithPopup(this.google)

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


onLogin(email:string,senha:string){
 return this.afauth.signInWithEmailAndPassword(email,senha)

}
recoverPassword(email:string){
  this.afauth.sendPasswordResetEmail(email)
}

getpic(){
  return this.db.collection("FotosLogin").valueChanges()
  }
  }

