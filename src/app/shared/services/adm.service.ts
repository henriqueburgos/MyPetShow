import { Injectable } from '@angular/core';
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
    public storage: AngularFireStorage
    ) { }

   addFirestore(login:Login,string:string){
    return this.db.collection('FotosLogin').doc(string).set({...login, uid:string})
   }

  

}
