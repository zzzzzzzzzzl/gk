import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XxZyComponent } from './xx-zy.component';

describe('XxZyComponent', () => {
  let component: XxZyComponent;
  let fixture: ComponentFixture<XxZyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XxZyComponent]
    });
    fixture = TestBed.createComponent(XxZyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
