import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEmpresasPage } from './registrar-empresas-page';

describe('RegistrarEmpresasPage', () => {
  let component: RegistrarEmpresasPage;
  let fixture: ComponentFixture<RegistrarEmpresasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarEmpresasPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarEmpresasPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
