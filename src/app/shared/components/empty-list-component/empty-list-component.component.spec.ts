import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListComponentComponent } from './empty-list-component.component';

describe('EmptyListComponentComponent', () => {
  let component: EmptyListComponentComponent;
  let fixture: ComponentFixture<EmptyListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
