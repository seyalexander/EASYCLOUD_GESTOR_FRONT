import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolPage } from './editar-rol-page';

describe('EditarRolPage', () => {
  let component: EditarRolPage;
  let fixture: ComponentFixture<EditarRolPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRolPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
