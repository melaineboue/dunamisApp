import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeReseauxComponent } from './liste-reseaux.component';

describe('ListeReseauxComponent', () => {
  let component: ListeReseauxComponent;
  let fixture: ComponentFixture<ListeReseauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeReseauxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeReseauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
