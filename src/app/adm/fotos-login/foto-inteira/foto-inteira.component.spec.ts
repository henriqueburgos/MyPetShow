import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoInteiraComponent } from './foto-inteira.component';

describe('FotoInteiraComponent', () => {
  let component: FotoInteiraComponent;
  let fixture: ComponentFixture<FotoInteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoInteiraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoInteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
