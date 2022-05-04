import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierReseauComponent } from './modifier-reseau.component';

describe('ModifierReseauComponent', () => {
  let component: ModifierReseauComponent;
  let fixture: ComponentFixture<ModifierReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierReseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
