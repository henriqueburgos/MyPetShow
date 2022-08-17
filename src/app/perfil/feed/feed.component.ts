import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Userasync } from 'src/app/shared/models/userasync';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
usuario?:any


  constructor(private afauth: AngularFireAuth, private router:Router) { }

  ngOnInit() {
    this.afauth.authState.pipe(
      tap(
        (resultado)=>{
           if(resultado){
            this.usuario=resultado
            console.log("caiu aqui")
           }else{
            this.afauth.signOut().then(
              a=> this.router.navigate([''])
            )
           }

        } 

      )
    ).subscribe()
  }

}
