import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionGrComponent } from './reunion-gr.component';

describe('ReunionGrComponent', () => {
  let component: ReunionGrComponent;
  let fixture: ComponentFixture<ReunionGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
