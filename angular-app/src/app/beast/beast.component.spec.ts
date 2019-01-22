import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeastComponent } from './beast.component';

describe('BeastComponent', () => {
  let component: BeastComponent;
  let fixture: ComponentFixture<BeastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
