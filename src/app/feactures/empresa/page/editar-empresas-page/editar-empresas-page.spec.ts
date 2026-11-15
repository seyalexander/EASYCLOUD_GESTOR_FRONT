import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpresasPage } from './editar-empresas-page';

describe('EditarEmpresasPage', () => {
  let component: EditarEmpresasPage;
  let fixture: ComponentFixture<EditarEmpresasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpresasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarEmpresasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
