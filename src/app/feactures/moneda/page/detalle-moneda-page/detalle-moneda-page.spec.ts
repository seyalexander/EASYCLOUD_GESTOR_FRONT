import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMonedaPage } from './detalle-moneda-page';

describe('DetalleMonedaPage', () => {
  let component: DetalleMonedaPage;
  let fixture: ComponentFixture<DetalleMonedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMonedaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMonedaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
