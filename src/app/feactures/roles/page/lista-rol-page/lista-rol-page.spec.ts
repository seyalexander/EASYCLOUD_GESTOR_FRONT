import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRolPage } from './lista-rol-page';

describe('ListaRolPage', () => {
  let component: ListaRolPage;
  let fixture: ComponentFixture<ListaRolPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaRolPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaRolPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
