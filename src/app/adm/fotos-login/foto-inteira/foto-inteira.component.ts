import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Login } from 'src/app/shared/models/login';
import { FotosLoginComponent } from '../fotos-login.component';


@Component({
  selector: 'app-foto-inteira',
  templateUrl: './foto-inteira.component.html',
  styleUrls: ['./foto-inteira.component.scss']
})
export class FotoInteiraComponent implements OnInit {
  
data2?:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: Login,private ref: MatDialogRef<FotosLoginComponent>) {}

  clicarfechar(){
this.ref.close()
  }

  ngOnInit(): void {
this.data2=this.data
  }

}
