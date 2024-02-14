import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgestionComponent } from './cgestion.component';

describe('CgestionComponent', () => {
  let component: CgestionComponent;
  let fixture: ComponentFixture<CgestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgestionComponent]
    });
    //.compileComponents();

    fixture = TestBed.createComponent(CgestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

