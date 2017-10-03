/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TriplogsApiService } from '../services/triplogs-api-service/triplogs-api.service';

import { AllTriplogsComponent } from './all-triplogs.component';

describe('AllTriplogsComponent', () => {
  let component: AllTriplogsComponent;
  let fixture: ComponentFixture<AllTriplogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTriplogsComponent ],
      providers: [TriplogsApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTriplogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
