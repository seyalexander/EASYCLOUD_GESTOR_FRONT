import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMarcaPage } from './editar-marca-page';

describe('EditarMarcaPage', () => {
  let component: EditarMarcaPage;
  let fixture: ComponentFixture<EditarMarcaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMarcaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarMarcaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
