import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEmpresasPage } from './detalle-empresas-page';

describe('DetalleEmpresasPage', () => {
  let component: DetalleEmpresasPage;
  let fixture: ComponentFixture<DetalleEmpresasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEmpresasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleEmpresasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
