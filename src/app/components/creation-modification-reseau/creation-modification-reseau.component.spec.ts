import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModificationReseauComponent } from './creation-modification-reseau.component';

describe('CreationModificationReseauComponent', () => {
  let component: CreationModificationReseauComponent;
  let fixture: ComponentFixture<CreationModificationReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationModificationReseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationModificationReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
