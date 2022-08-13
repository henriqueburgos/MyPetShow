import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosUserComponent } from './dados-user.component';

describe('DadosUserComponent', () => {
  let component: DadosUserComponent;
  let fixture: ComponentFixture<DadosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
