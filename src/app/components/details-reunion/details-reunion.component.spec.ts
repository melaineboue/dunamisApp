import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReunionComponent } from './details-reunion.component';

describe('DetailsReunionComponent', () => {
  let component: DetailsReunionComponent;
  let fixture: ComponentFixture<DetailsReunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
