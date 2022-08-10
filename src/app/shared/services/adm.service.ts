import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { resolve } from 'dns';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  constructor(
    private db :AngularFirestore,
    public storage: AngularFireStorage,
    private afauth:AngularFireAuth
    ) { }

   addFirestore(login:Login,string:string){
    return this.db.collection('FotosLogin').doc(string).set({...login, uid:string})
   }

   getpic(){
    return this.db.collection("FotosLogin").valueChanges()
    }
    

   getUser(){
    return this.db.collection("Usuario").valueChanges()
    }
   deleteUser(uid:string){
    return this.db.collection("Usuario").doc(uid).delete()
    }
    logout(){
    return this.afauth.signOut()
    }

    deletepic(uid:string){
      return this.db.collection("FotosLogin").doc(uid).delete()
    }

}
