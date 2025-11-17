import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGamesCard } from './list-games-card';

describe('ListGamesCard', () => {
  let component: ListGamesCard;
  let fixture: ComponentFixture<ListGamesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGamesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGamesCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
