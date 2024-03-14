import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOInternoComponent } from './modal-ointerno.component';

describe('ModalOInternoComponent', () => {
  let component: ModalOInternoComponent;
  let fixture: ComponentFixture<ModalOInternoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOInternoComponent]
    });
    fixture = TestBed.createComponent(ModalOInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
