import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaPrincipalComponent } from './mensajeria-principal.component';

describe('MensajeriaPrincipalComponent', () => {
  let component: MensajeriaPrincipalComponent;
  let fixture: ComponentFixture<MensajeriaPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeriaPrincipalComponent]
    });
    fixture = TestBed.createComponent(MensajeriaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
