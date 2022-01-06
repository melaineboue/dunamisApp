import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererGrComponent } from './generer-gr.component';

describe('GenererGrComponent', () => {
  let component: GenererGrComponent;
  let fixture: ComponentFixture<GenererGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenererGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
