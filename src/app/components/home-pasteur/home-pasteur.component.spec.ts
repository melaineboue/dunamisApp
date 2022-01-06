import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePasteurComponent } from './home-pasteur.component';

describe('HomePasteurComponent', () => {
  let component: HomePasteurComponent;
  let fixture: ComponentFixture<HomePasteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePasteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePasteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
