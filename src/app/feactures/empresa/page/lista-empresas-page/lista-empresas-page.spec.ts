import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEmpresasPage } from './lista-empresas-page';

describe('ListaEmpresasPage', () => {
  let component: ListaEmpresasPage;
  let fixture: ComponentFixture<ListaEmpresasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEmpresasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEmpresasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
