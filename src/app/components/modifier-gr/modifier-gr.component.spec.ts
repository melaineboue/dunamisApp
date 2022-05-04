import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGrComponent } from './modifier-gr.component';

describe('ModifierGrComponent', () => {
  let component: ModifierGrComponent;
  let fixture: ComponentFixture<ModifierGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
