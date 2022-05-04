import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCreerModifierPersonneComponent } from './formulaire-creer-modifier-personne.component';

describe('FormulaireCreerModifierPersonneComponent', () => {
  let component: FormulaireCreerModifierPersonneComponent;
  let fixture: ComponentFixture<FormulaireCreerModifierPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCreerModifierPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCreerModifierPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
