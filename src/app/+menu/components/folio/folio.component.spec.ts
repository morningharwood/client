/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FolioComponent } from './folio.component';

describe('FolioComponent', () => {
  let component: FolioComponent;
  let fixture: ComponentFixture<FolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
