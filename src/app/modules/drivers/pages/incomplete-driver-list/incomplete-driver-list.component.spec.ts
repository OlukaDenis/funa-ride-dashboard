import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteDriverListComponent } from './incomplete-driver-list.component';

describe('IncompleteDriverListComponent', () => {
  let component: IncompleteDriverListComponent;
  let fixture: ComponentFixture<IncompleteDriverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncompleteDriverListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompleteDriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
