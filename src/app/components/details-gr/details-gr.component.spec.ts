import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGrComponent } from './details-gr.component';

describe('DetailsGrComponent', () => {
  let component: DetailsGrComponent;
  let fixture: ComponentFixture<DetailsGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
