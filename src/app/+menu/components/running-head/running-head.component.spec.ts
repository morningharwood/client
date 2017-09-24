/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RunningHeadComponent } from './running-head.component';

describe('RunningHeadComponent', () => {
  let component: RunningHeadComponent;
  let fixture: ComponentFixture<RunningHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
