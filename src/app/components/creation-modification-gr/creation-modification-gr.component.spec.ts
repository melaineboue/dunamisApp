import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModificationGrComponent } from './creation-modification-gr.component';

describe('CreationModificationGrComponent', () => {
  let component: CreationModificationGrComponent;
  let fixture: ComponentFixture<CreationModificationGrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationModificationGrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationModificationGrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
