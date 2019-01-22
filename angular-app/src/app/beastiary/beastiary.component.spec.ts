import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeastiaryComponent } from './beastiary.component';

describe('BeastiaryComponent', () => {
  let component: BeastiaryComponent;
  let fixture: ComponentFixture<BeastiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeastiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeastiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
