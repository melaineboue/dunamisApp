import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePersonneByGrComponent } from './liste-personne-by-gr.component';

describe('ListePersonneByGrComponent', () => {
  let component: ListePersonneByGrComponent;
  let fixture: ComponentFixture<ListePersonneByGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListePersonneByGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListePersonneByGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
