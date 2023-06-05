import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gk2022Component } from './gk2022.component';

describe('Gk2022Component', () => {
  let component: Gk2022Component;
  let fixture: ComponentFixture<Gk2022Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Gk2022Component]
    });
    fixture = TestBed.createComponent(Gk2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
