import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLogadoComponent } from './perfil-logado.component';

describe('PerfilLogadoComponent', () => {
  let component: PerfilLogadoComponent;
  let fixture: ComponentFixture<PerfilLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilLogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
