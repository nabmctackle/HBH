import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCampaignsComponent } from './public-campaigns.component';

describe('PublicCampaignsComponent', () => {
  let component: PublicCampaignsComponent;
  let fixture: ComponentFixture<PublicCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
