import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaListaPreciosPage } from './lista-lista-precios-page';

describe('ListaListaPreciosPage', () => {
  let component: ListaListaPreciosPage;
  let fixture: ComponentFixture<ListaListaPreciosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaListaPreciosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaListaPreciosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
