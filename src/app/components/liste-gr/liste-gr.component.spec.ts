import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGrComponent } from './liste-gr.component';

describe('ListeGrComponent', () => {
  let component: ListeGrComponent;
  let fixture: ComponentFixture<ListeGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
