import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMonedaPage } from './editar-moneda-page';

describe('EditarMonedaPage', () => {
  let component: EditarMonedaPage;
  let fixture: ComponentFixture<EditarMonedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMonedaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarMonedaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
