/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ItemComponent } from './item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizePipe } from '../../../../_handies/pipes/capitalize';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent,CapitalizePipe ],
      imports: [RouterTestingModule ]
    })
    .compileComponents();
  }));
});
