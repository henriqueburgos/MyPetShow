import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdmComponent implements OnInit {

  constructor(private afauth:AngularFireAuth,private ht:HotToastService,private router:Router) { }

  ngOnInit(): void {
    let admin1:boolean
    this.afauth.authState.subscribe( a=> {
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
         if(admin1){
          console.log("admin")
          
        }else{
        this.ht.success("Area restrita!")  
        this.router.navigate(['/usuario/feed'])}
    })             
    })  
}

  }

