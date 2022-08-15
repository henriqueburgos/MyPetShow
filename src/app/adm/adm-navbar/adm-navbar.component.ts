import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { AdmService } from 'src/app/shared/services/adm.service';

@Component({
  selector: 'app-adm-navbar',
  templateUrl: './adm-navbar.component.html',
  styleUrls: ['./adm-navbar.component.scss']
})
export class AdmNavbarComponent implements OnInit {
user?:any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver,private adm : AdmService, 
    private router:Router, private afauth:AngularFireAuth) { }
logout(){
  this.adm.logout().then(()=>this.router.navigate(['']))
}

  ngOnInit(): void {
    this.afauth.authState.pipe(
      tap((user)=> this.user=user )).subscribe()
  }
}
