import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Usuario } from '../models/usuario';
import { GoogleAuthProvider } from "firebase/auth";
@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private google:GoogleAuthProvider,
    private afauth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }



  onloginGoogle(){
    this.afauth.signInWithPopup(this.google)

  }

  onsubmit(email:string,senha:string, user1:Usuario){
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
    .catch(error=> console.log)
  }
}
