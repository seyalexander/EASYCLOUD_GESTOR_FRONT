import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMarcaPage } from './lista-marca-page';

describe('ListaMarcaPage', () => {
  let component: ListaMarcaPage;
  let fixture: ComponentFixture<ListaMarcaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMarcaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaMarcaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
