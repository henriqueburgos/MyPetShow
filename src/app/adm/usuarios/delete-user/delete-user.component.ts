import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuariosComponent } from '../usuarios.component';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  clicarfechar() {
    this.ref.close();
  }
  clicardeletar() {
    this.ref.close(true);
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private ref: MatDialogRef<UsuariosComponent>
  ) {}

  ngOnInit(): void {}
}
