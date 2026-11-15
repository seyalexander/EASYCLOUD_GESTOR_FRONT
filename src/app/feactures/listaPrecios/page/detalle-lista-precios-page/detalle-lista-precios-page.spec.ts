import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleListaPreciosPage } from './detalle-lista-precios-page';

describe('DetalleListaPreciosPage', () => {
  let component: DetalleListaPreciosPage;
  let fixture: ComponentFixture<DetalleListaPreciosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleListaPreciosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleListaPreciosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
