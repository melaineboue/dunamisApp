import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrComponent } from './add-gr.component';

describe('AddGrComponent', () => {
  let component: AddGrComponent;
  let fixture: ComponentFixture<AddGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
