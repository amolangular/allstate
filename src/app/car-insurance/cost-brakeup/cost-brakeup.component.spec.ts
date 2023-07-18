import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBrakeupComponent } from './cost-brakeup.component';

describe('CostBrakeupComponent', () => {
  let component: CostBrakeupComponent;
  let fixture: ComponentFixture<CostBrakeupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostBrakeupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostBrakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
