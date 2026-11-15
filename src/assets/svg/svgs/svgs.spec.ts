import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Svgs } from './svgs';

describe('Svgs', () => {
  let component: Svgs;
  let fixture: ComponentFixture<Svgs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Svgs],
    }).compileComponents();

    fixture = TestBed.createComponent(Svgs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
