import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersComponent } from './passengers.component';

describe('PassengersComponent', () => {
  let component: PassengersComponent;
  let fixture: ComponentFixture<PassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
