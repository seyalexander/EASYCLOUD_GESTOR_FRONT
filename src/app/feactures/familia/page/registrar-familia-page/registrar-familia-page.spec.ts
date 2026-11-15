import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFamiliaPage } from './registrar-familia-page';

describe('RegistrarFamiliaPage', () => {
  let component: RegistrarFamiliaPage;
  let fixture: ComponentFixture<RegistrarFamiliaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFamiliaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarFamiliaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
