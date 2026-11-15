import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubfamiliaPage } from './lista-subfamilia-page';

describe('ListaSubfamiliaPage', () => {
  let component: ListaSubfamiliaPage;
  let fixture: ComponentFixture<ListaSubfamiliaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSubfamiliaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSubfamiliaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
