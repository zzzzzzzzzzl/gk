import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaxunComponent } from './chaxun.component';

describe('ChaxunComponent', () => {
  let component: ChaxunComponent;
  let fixture: ComponentFixture<ChaxunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChaxunComponent]
    });
    fixture = TestBed.createComponent(ChaxunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
