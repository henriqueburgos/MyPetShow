import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription, tap } from 'rxjs';
import { AttFoto } from 'src/app/shared/models/AttFoto';
import { Login } from 'src/app/shared/models/login';
import { Userasync } from 'src/app/shared/models/userasync';
import { AdmService } from 'src/app/shared/services/adm.service';

@Component({
  selector: 'app-perfil-logado',
  templateUrl: './perfil-logado.component.html',
  styleUrls: ['./perfil-logado.component.scss'],
})
export class PerfilLogadoComponent implements OnInit {
  constructor(
    private afauth: AngularFireAuth,
    private storage: AngularFireStorage,
    private adm: AdmService,
    private ht: HotToastService
  ) {}

  user?: Userasync;
  carregado = false;
  sub?: Subscription;
  imagem?: File;
  nomeImg?: string;
  preEnvio = false;
  txtbutton = 'Adicionar foto';
  classe: string = 'btn-primary';
  fotosLogin$?: any;
  processoConcluido$?: boolean;
  enviando?: boolean = false;

  upload() {
    this.processoConcluido$ = false;
    this.enviando = true;

    const filePath = `FotosPerfil/${this.user?.uid}`;
    const ref = this.storage.ref(filePath);
    this.storage.upload(filePath, this.imagem).then((a) =>
      a.ref.getDownloadURL().then((url) => {
        let foto: AttFoto = {
          uid: this.user!.uid,
          photo: url,
        };
        console.log(foto);
        this.adm.attFoto(foto).subscribe();
        this.adm
          .attFotodb(foto.uid, url)
          .then((a) => {
            this.ht.success('Imagem cadastrada no banco de dados');
            this.processoConcluido$ = undefined;
            this.enviando = false;
            this.preEnvio = false;
            this.txtbutton = 'Adicionar foto';
            this.classe = 'btn-primary';
          })
          .catch((error) => console.log(error));
      })
    );
  }

  setImage(ev: any) {
    this.imagem = ev.target.files[0];
    this.nomeImg = this.imagem?.name;
    this.classe = 'btn-success';
    this.txtbutton = 'Foto adicionada!';
    this.preEnvio = true;
  }

  resetimg() {
    console.log(this.imagem);
    this.imagem = undefined;
    this.txtbutton = 'Adicionar foto';
    this.classe = 'btn-primary';
    this.preEnvio = false;
    console.log(this.imagem);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.afauth.authState
      .pipe(
        tap((user) => {
          this.adm.getToken(user).subscribe((resposta) => {
            console.log(resposta);
            let conversor: any = resposta;
            console.log(conversor);

            this.user = conversor.result;
            console.log(this.user);
          });
        })
      )
      .subscribe(() => (this.carregado = true));
  }
  
}
