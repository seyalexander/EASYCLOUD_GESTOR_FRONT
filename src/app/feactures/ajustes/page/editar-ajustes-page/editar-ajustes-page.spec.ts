import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAjustesPage } from './editar-ajustes-page';

describe('EditarAjustesPage', () => {
  let component: EditarAjustesPage;
  let fixture: ComponentFixture<EditarAjustesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAjustesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAjustesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
