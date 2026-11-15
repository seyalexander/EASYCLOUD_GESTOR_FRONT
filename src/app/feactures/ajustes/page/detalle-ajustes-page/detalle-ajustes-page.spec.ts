import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAjustesPage } from './detalle-ajustes-page';

describe('DetalleAjustesPage', () => {
  let component: DetalleAjustesPage;
  let fixture: ComponentFixture<DetalleAjustesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAjustesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAjustesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
