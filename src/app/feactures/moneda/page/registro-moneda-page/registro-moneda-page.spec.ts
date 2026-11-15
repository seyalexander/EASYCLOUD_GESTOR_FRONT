import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMonedaPage } from './registro-moneda-page';

describe('RegistroMonedaPage', () => {
  let component: RegistroMonedaPage;
  let fixture: ComponentFixture<RegistroMonedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMonedaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroMonedaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
