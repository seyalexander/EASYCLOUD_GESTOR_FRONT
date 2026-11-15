import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeriePage } from './editar-serie-page';

describe('EditarSeriePage', () => {
  let component: EditarSeriePage;
  let fixture: ComponentFixture<EditarSeriePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSeriePage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarSeriePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
