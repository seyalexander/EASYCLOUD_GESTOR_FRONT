import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRolPage } from './registrar-rol-page';

describe('RegistrarRolPage', () => {
  let component: RegistrarRolPage;
  let fixture: ComponentFixture<RegistrarRolPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRolPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarRolPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
