import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroListaPreciosPage } from './registro-lista-precios-page';

describe('RegistroListaPreciosPage', () => {
  let component: RegistroListaPreciosPage;
  let fixture: ComponentFixture<RegistroListaPreciosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroListaPreciosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroListaPreciosPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
