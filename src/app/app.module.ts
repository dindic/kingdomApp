import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { KingdomComponent } from './kingdom/kingdom.component';
import { LeadersComponent } from './leaders/leaders.component';
import { ControlBonusComponent } from './control-bonus/control-bonus.component';
import { ControlOnOffPipe } from './pipes/pipes.controlOnOff';
import { LiteralBuildingPipe } from './pipes/pipes.literal.buildings';
import { LiteralCodePipe } from './pipes/pipes.literal.code';
import { AppRoutingModule } from './/app-routing.module';
import { LeaderComponent } from './leader/leader.component';
import { CitiesComponent } from './cities/cities.component';
import { CityComponent } from './city/city.component';
import { CityMenuComponent } from './city-menu/city-menu.component';
import { DistrictComponent } from './district/district.component';
import { OpticonsDirective } from './directives/opticons.directive';
import { ImprovementsComponent } from './improvements/improvements.component';
import { SpecialTerrainComponent } from './special-terrain/special-terrain.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { NewKingdomComponent } from './new-kingdom/new-kingdom.component';
import { MessagesComponent } from './messages/messages.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { AddBuildingComponent } from './add-building/add-building.component';
import { SavedKingdomsComponent } from './saved-kingdoms/saved-kingdoms.component';
import { SavedKingdomsContainerComponent } from './saved-kingdoms-container/saved-kingdoms-container.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth/auth.guard.service';
import { SignInService } from './auth/signin.service';
import { NewCityComponent } from './new-city/new-city.component';



@NgModule({
  declarations: [
    AppComponent,
    KingdomComponent,
    LeadersComponent,
    ControlBonusComponent,
    ControlOnOffPipe,
    LiteralBuildingPipe,
    LiteralCodePipe,
    LeaderComponent,
    CitiesComponent,
    CityComponent,
    CityMenuComponent,
    DistrictComponent,
    OpticonsDirective,
    ImprovementsComponent,
    SpecialTerrainComponent,
    NeighbourhoodComponent,
    NewKingdomComponent,
    MessagesComponent,
    AddBuildingComponent,
    SavedKingdomsComponent,
    SavedKingdomsContainerComponent,
    SignupComponent,
    SigninComponent,
    LateralMenuComponent,
    InicioComponent,
    NewCityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [AuthGuard, SignInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
