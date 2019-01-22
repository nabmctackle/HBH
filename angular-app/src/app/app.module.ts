import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { MyCampaignsComponent } from './my-campaigns/my-campaigns.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { CampaignhomeComponent } from './campaignhome/campaignhome.component';
import { LoginComponent } from './login/login.component';
import { PublicCampaignsComponent } from './public-campaigns/public-campaigns.component';
import { PlotComponent } from './plot/plot.component';
import { MapsComponent } from './maps/maps.component';
import { CharactersComponent } from './characters/characters.component';
import { LocationsComponent } from './locations/locations.component';
import { BeastiaryComponent } from './beastiary/beastiary.component';
import { ItemsComponent } from './items/items.component';
import { PlotsComponent } from './plots/plots.component';
import { LocationComponent } from './location/location.component';
import { BeastComponent } from './beast/beast.component';
import { MapComponent } from './map/map.component';
import { CharacterComponent } from './character/character.component';
import { ItemComponent } from './item/item.component';
import { PlotAddComponent } from './plot-add/plot-add.component';
import { MapAddComponent } from './map-add/map-add.component';
import { LocationsAddComponent } from './locations-add/locations-add.component';
import { CharacterAddComponent } from './character-add/character-add.component';
import { BeastAddComponent } from './beast-add/beast-add.component';
import { ItemAddComponent } from './item-add/item-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyCampaignsComponent,
    NewCampaignComponent,
    CampaignhomeComponent,
    LoginComponent,
    PublicCampaignsComponent,
    PlotComponent,
    MapsComponent,
    CharactersComponent,
    LocationsComponent,
    BeastiaryComponent,
    ItemsComponent,
    PlotsComponent,
    LocationComponent,
    BeastComponent,
    MapComponent,
    CharacterComponent,
    ItemComponent,
    PlotAddComponent,
    MapAddComponent,
    LocationsAddComponent,
    CharacterAddComponent,
    BeastAddComponent,
    ItemAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
