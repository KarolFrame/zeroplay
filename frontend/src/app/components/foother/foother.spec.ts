import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foother } from './foother';

describe('Foother', () => {
  let component: Foother;
  let fixture: ComponentFixture<Foother>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foother]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foother);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
