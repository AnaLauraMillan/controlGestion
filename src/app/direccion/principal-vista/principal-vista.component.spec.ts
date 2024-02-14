import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalVistaComponent } from './principal-vista.component';

describe('PrincipalVistaComponent', () => {
  let component: PrincipalVistaComponent;
  let fixture: ComponentFixture<PrincipalVistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalVistaComponent]
    });
    fixture = TestBed.createComponent(PrincipalVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
