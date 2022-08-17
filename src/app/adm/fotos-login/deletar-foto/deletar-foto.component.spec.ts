import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarFotoComponent } from './deletar-foto.component';

describe('DeletarFotoComponent', () => {
  let component: DeletarFotoComponent;
  let fixture: ComponentFixture<DeletarFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarFotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
