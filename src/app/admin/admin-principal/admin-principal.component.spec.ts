import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrincipalComponent } from './admin-principal.component';

describe('AdminPrincipalComponent', () => {
  let component: AdminPrincipalComponent;
  let fixture: ComponentFixture<AdminPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPrincipalComponent]
    });
    fixture = TestBed.createComponent(AdminPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
