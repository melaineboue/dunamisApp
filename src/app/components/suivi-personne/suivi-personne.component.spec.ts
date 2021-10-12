import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviPersonneComponent } from './suivi-personne.component';

describe('SuiviPersonneComponent', () => {
  let component: SuiviPersonneComponent;
  let fixture: ComponentFixture<SuiviPersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviPersonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviPersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
