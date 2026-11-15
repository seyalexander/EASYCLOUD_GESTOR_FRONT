import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSeriePage } from './registro-serie-page';

describe('RegistroSeriePage', () => {
  let component: RegistroSeriePage;
  let fixture: ComponentFixture<RegistroSeriePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroSeriePage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroSeriePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
