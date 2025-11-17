import { TestBed } from '@angular/core/testing';

import { GamesServiceTop5 } from './games';

describe('Games', () => {
  let service: GamesServiceTop5;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesServiceTop5);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
