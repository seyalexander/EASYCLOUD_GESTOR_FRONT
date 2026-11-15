import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMonedaPage } from './lista-moneda-page';

describe('ListaMonedaPage', () => {
  let component: ListaMonedaPage;
  let fixture: ComponentFixture<ListaMonedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMonedaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMonedaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
