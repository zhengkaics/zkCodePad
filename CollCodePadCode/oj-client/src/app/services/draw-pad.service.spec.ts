import { TestBed, inject } from '@angular/core/testing';

import { DrawPadService } from './draw-pad.service';

describe('DrawPadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawPadService]
    });
  });

  it('should be created', inject([DrawPadService], (service: DrawPadService) => {
    expect(service).toBeTruthy();
  }));
});
