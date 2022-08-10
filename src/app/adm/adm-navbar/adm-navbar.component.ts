import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmService } from 'src/app/shared/services/adm.service';

@Component({
  selector: 'app-adm-navbar',
  templateUrl: './adm-navbar.component.html',
  styleUrls: ['./adm-navbar.component.scss']
})
export class AdmNavbarComponent implements OnInit {

  constructor(private adm : AdmService, 
    private router:Router) { }
logout(){
  this.adm.logout().then(()=>this.router.navigate(['']))
}
  ngOnInit(): void {
  }

}
