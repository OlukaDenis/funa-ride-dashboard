import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDriverRegistrationsComponent } from './failed-driver-registrations.component';

describe('FailedDriverRegistrationsComponent', () => {
  let component: FailedDriverRegistrationsComponent;
  let fixture: ComponentFixture<FailedDriverRegistrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedDriverRegistrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedDriverRegistrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
