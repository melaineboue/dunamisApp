import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnecterComponent } from './deconnecter.component';

describe('DeconnecterComponent', () => {
  let component: DeconnecterComponent;
  let fixture: ComponentFixture<DeconnecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeconnecterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconnecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
