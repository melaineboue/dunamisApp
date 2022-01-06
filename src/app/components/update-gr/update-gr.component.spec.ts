import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrComponent } from './update-gr.component';

describe('UpdateGrComponent', () => {
  let component: UpdateGrComponent;
  let fixture: ComponentFixture<UpdateGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
