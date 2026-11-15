import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMarcaPage } from './detalle-marca-page';

describe('DetalleMarcaPage', () => {
  let component: DetalleMarcaPage;
  let fixture: ComponentFixture<DetalleMarcaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMarcaPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleMarcaPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
