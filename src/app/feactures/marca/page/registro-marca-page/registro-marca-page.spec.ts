import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMarcaPage } from './registro-marca-page';

describe('RegistroMarcaPage', () => {
  let component: RegistroMarcaPage;
  let fixture: ComponentFixture<RegistroMarcaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMarcaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroMarcaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
