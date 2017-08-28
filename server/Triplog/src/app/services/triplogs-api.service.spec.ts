/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TriplogsApiService } from './triplogs-api.service';

describe('TriplogsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriplogsApiService]
    });
  });

  it('should ...', inject([TriplogsApiService], (service: TriplogsApiService) => {
    expect(service).toBeTruthy();
  }));
});
