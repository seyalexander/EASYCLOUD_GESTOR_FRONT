import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSeriePage } from './detalle-serie-page';

describe('DetalleSeriePage', () => {
  let component: DetalleSeriePage;
  let fixture: ComponentFixture<DetalleSeriePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleSeriePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleSeriePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
