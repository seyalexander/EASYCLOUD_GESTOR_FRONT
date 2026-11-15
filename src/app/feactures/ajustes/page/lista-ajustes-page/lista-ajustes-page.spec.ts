import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAjustesPage } from './lista-ajustes-page';

describe('ListaAjustesPage', () => {
  let component: ListaAjustesPage;
  let fixture: ComponentFixture<ListaAjustesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAjustesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAjustesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
