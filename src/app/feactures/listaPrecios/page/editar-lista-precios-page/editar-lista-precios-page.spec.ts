import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarListaPreciosPage } from './editar-lista-precios-page';

describe('EditarListaPreciosPage', () => {
  let component: EditarListaPreciosPage;
  let fixture: ComponentFixture<EditarListaPreciosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarListaPreciosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarListaPreciosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
