import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRolPage } from './detalle-rol-page';

describe('DetalleRolPage', () => {
  let component: DetalleRolPage;
  let fixture: ComponentFixture<DetalleRolPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRolPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleRolPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
