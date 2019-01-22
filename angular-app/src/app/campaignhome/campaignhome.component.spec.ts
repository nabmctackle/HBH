import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignhomeComponent } from './campaignhome.component';

describe('CampaignhomeComponent', () => {
  let component: CampaignhomeComponent;
  let fixture: ComponentFixture<CampaignhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
