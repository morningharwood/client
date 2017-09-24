/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BonerComponent } from './boner.component';

describe('BonerComponent', () => {
  let component: BonerComponent;
  let fixture: ComponentFixture<BonerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
