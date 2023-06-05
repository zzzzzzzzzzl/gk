import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { gaokaoComponent } from './gao-kao.component';

describe('GaoKaoComponent', () => {
  let component: gaokaoComponent;
  let fixture: ComponentFixture<gaokaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [gaokaoComponent]
    });
    fixture = TestBed.createComponent(gaokaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
