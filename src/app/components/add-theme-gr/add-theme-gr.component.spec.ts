import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThemeGrComponent } from './add-theme-gr.component';

describe('AddThemeGrComponent', () => {
  let component: AddThemeGrComponent;
  let fixture: ComponentFixture<AddThemeGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThemeGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThemeGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
