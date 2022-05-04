import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPersonneComponent } from './modifier-personne.component';

describe('ModifierPersonneComponent', () => {
  let component: ModifierPersonneComponent;
  let fixture: ComponentFixture<ModifierPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
