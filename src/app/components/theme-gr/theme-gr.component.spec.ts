import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeGrComponent } from './theme-gr.component';

describe('ThemeGrComponent', () => {
  let component: ThemeGrComponent;
  let fixture: ComponentFixture<ThemeGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
