import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotAddComponent } from './plot-add.component';

describe('PlotAddComponent', () => {
  let component: PlotAddComponent;
  let fixture: ComponentFixture<PlotAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
