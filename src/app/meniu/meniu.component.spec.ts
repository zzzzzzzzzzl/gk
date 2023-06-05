import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniuComponent } from './meniu.component';

describe('MeniuComponent', () => {
  let component: MeniuComponent;
  let fixture: ComponentFixture<MeniuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeniuComponent]
    });
    fixture = TestBed.createComponent(MeniuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
