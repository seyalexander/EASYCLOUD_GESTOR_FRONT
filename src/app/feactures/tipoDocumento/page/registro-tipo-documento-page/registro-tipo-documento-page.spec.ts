import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTipoDocumentoPage } from './registro-tipo-documento-page';

describe('RegistroTipoDocumentoPage', () => {
  let component: RegistroTipoDocumentoPage;
  let fixture: ComponentFixture<RegistroTipoDocumentoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTipoDocumentoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroTipoDocumentoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
