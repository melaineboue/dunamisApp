import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResponsableReseauComponent } from './home-responsable-reseau.component';

describe('HomeResponsableReseauComponent', () => {
  let component: HomeResponsableReseauComponent;
  let fixture: ComponentFixture<HomeResponsableReseauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeResponsableReseauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeResponsableReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
