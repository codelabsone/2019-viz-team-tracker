import { TestBed } from '@angular/core/testing';

import { DraggingService } from './dragging.service';

describe('DraggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DraggingService = TestBed.get(DraggingService);
    expect(service).toBeTruthy();
  });
});
