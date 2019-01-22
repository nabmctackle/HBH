import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeastAddComponent } from './beast-add.component';

describe('BeastAddComponent', () => {
  let component: BeastAddComponent;
  let fixture: ComponentFixture<BeastAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeastAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeastAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
