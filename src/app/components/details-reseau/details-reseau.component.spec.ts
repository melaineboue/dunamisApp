import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReseauComponent } from './details-reseau.component';

describe('DetailsReseauComponent', () => {
  let component: DetailsReseauComponent;
  let fixture: ComponentFixture<DetailsReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
