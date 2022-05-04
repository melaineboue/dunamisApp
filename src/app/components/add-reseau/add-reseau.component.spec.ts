import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReseauComponent } from './add-reseau.component';

describe('AddReseauComponent', () => {
  let component: AddReseauComponent;
  let fixture: ComponentFixture<AddReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
