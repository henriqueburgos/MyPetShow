import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosLoginComponent } from './fotos-login.component';

describe('FotosLoginComponent', () => {
  let component: FotosLoginComponent;
  let fixture: ComponentFixture<FotosLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotosLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
