import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAddComponent } from './map-add.component';

describe('MapAddComponent', () => {
  let component: MapAddComponent;
  let fixture: ComponentFixture<MapAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
