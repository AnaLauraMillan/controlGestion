import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesIComponent } from './modal-detalles-i.component';

describe('ModalDetallesIComponent', () => {
  let component: ModalDetallesIComponent;
  let fixture: ComponentFixture<ModalDetallesIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDetallesIComponent]
    });
    fixture = TestBed.createComponent(ModalDetallesIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
