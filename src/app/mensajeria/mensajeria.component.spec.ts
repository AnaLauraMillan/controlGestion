import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaComponent } from './mensajeria.component';

describe('MensajeriaComponent', () => {
  let component: MensajeriaComponent;
  let fixture: ComponentFixture<MensajeriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeriaComponent]
    });
    fixture = TestBed.createComponent(MensajeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
