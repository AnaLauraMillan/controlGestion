import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalCGestionComponent } from './principal-cgestion.component';

describe('PrincipalCGestionComponent', () => {
  let component: PrincipalCGestionComponent;
  let fixture: ComponentFixture<PrincipalCGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalCGestionComponent]
    });
    fixture = TestBed.createComponent(PrincipalCGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
