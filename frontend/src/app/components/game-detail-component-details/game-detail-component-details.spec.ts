import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailComponentDetails } from './game-detail-component-details';

describe('GameDetailComponentDetails', () => {
  let component: GameDetailComponentDetails;
  let fixture: ComponentFixture<GameDetailComponentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailComponentDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailComponentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
