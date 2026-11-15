import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeriePage } from './lista-serie-page';

describe('ListaSeriePage', () => {
  let component: ListaSeriePage;
  let fixture: ComponentFixture<ListaSeriePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSeriePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSeriePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
