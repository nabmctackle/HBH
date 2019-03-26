import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component'
import { MyCampaignsComponent} from "./my-campaigns/my-campaigns.component"
import { NewCampaignComponent} from "./new-campaign/new-campaign.component"
import { CampaignhomeComponent} from "./campaignhome/campaignhome.component"
import { LoginComponent} from "./login/login.component"
import { PublicCampaignsComponent} from "./public-campaigns/public-campaigns.component"
import {PlotsComponent} from "./plots/plots.component"
import { LocationsComponent} from "./locations/locations.component"
import { BeastiaryComponent} from "./beastiary/beastiary.component"
import { MapsComponent} from "./maps/maps.component"
import { CharactersComponent } from './characters/characters.component'
import { ItemsComponent} from "./items/items.component"
import { PlotComponent } from './plot/plot.component'
import { LocationComponent} from "./location/location.component"
import { BeastComponent} from "./beast/beast.component"
import { MapComponent} from "./map/map.component"
import { CharacterComponent} from "./character/character.component"
import { ItemComponent } from './item/item.component';
import { PlotAddComponent } from './plot-add/plot-add.component';
import { MapAddComponent} from "./map-add/map-add.component"
import { LocationsAddComponent } from './locations-add/locations-add.component';
import {CharacterAddComponent   } from "./character-add/character-add.component"
import {BeastAddComponent} from "./beast-add/beast-add.component"
import {ItemAddComponent} from "./item-add/item-add.component"
const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"mycampaigns", component:MyCampaignsComponent},
    {path:"newcampaign",component:NewCampaignComponent},
    {path:"campaignhome/:id", component:CampaignhomeComponent},
    {path:"signIn", component:LoginComponent},
    {path:"publiccampaigns", component:PublicCampaignsComponent},
    {path:"plots", component:PlotsComponent},
    {path:"locations", component:LocationsComponent},
    {path:"beastiary", component:BeastiaryComponent},
    {path:"maps",component:MapsComponent},
    {path:"characters", component: CharactersComponent},
    {path:"items", component: ItemsComponent},
    {path:"plots/:id",component:PlotComponent},
    {path:"locations/:id",component:LocationComponent},
    {path:"beast", component:BeastComponent},
    {path:"map", component:MapComponent},
    {path:"characters/:id", component:CharacterComponent},
    {path:"item", component:ItemComponent},
    {path:"addplot/:id", component:PlotAddComponent},
    {path:"addmap/:id", component:MapAddComponent},
    {path:"addlocation/:id", component:LocationsAddComponent},
    {path:"addcharacter/:id", component:CharacterAddComponent},
    {path:"addbeast/:id",component:BeastAddComponent},
    {path:"additem/:id",component: ItemAddComponent},


    {path:"",pathMatch:'full', redirectTo:'/home'}
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}