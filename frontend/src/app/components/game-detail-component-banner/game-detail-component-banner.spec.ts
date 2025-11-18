import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailComponentBanner } from './game-detail-component-banner';

describe('GameDetailComponentBanner', () => {
  let component: GameDetailComponentBanner;
  let fixture: ComponentFixture<GameDetailComponentBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailComponentBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailComponentBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
