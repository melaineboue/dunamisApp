import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResponsableGrComponent } from './home-responsable-gr.component';

describe('HomeResponsableGrComponent', () => {
  let component: HomeResponsableGrComponent;
  let fixture: ComponentFixture<HomeResponsableGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResponsableGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeResponsableGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
