import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversWithDebtsComponent } from './drivers-with-debts.component';

describe('DriversWithDebtsComponent', () => {
  let component: DriversWithDebtsComponent;
  let fixture: ComponentFixture<DriversWithDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversWithDebtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversWithDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
