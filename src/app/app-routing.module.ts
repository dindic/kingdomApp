import { CityComponent } from './city/city.component';
import { CitiesComponent } from './cities/cities.component';
import { LeadersComponent } from './leaders/leaders.component';
import { KingdomComponent } from './kingdom/kingdom.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district/district.component';
import { ImprovementsComponent } from './improvements/improvements.component';
import { SpecialTerrainComponent } from './special-terrain/special-terrain.component';
import { NeighbourhoodComponent } from './neighbourhood/neighbourhood.component';
import { NewKingdomComponent } from './new-kingdom/new-kingdom.component';
import { SavedKingdomsComponent } from './saved-kingdoms/saved-kingdoms.component';
import { SavedKingdomsContainerComponent } from './saved-kingdoms-container/saved-kingdoms-container.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './auth/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  
  {
    path: 'inicio',
    component: InicioComponent,
    data: { title: 'Welcome' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up' , animation: {page: 'rootPage'}}
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: { title: 'Sign In' , animation: {page: 'rootPage'}}
  },
  {
    path: 'kingdom/:idk',
    component: KingdomComponent,
    canActivate: [AuthGuard],
    data: { title: 'Kingdom Base' , animation: {page: 'rootPage'}}
  },
  {
    path: 'leaders/:idc',
    component: LeadersComponent,
    canActivate: [AuthGuard],
    data: { title: 'Leaders List', animation: {page: 'leaders'}}
  },
  {
    path: 'cities/:idc',
    component: CitiesComponent,
    canActivate: [AuthGuard],
    data: { title: 'Cities List', animation: {page: 'cities'}}
  },
  {
    path: 'city',
    component: CityComponent,
    canActivate: [AuthGuard],
    data: { title: 'City Grid', animation: {page: 'city'}}
  },
  {
    path: 'district/:idc/:idn/:idk',
    component: DistrictComponent,
    canActivate: [AuthGuard],
    data: { title: 'District Grid', animation: {page: 'district'}}
  },
  {
    path: 'neighbourhood',
    component: NeighbourhoodComponent,
    canActivate: [AuthGuard],
    data: { title: 'neighbourhood Grid', animation: {page: 'neighbourhood'}}
  },
  {
    path: 'improvements/:idc',
    component: ImprovementsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Improvements', animation: {page: 'improvements'}}
  },
  {
    path: 'specialterrain/:idk',
    component: SpecialTerrainComponent,
    canActivate: [AuthGuard],
    data: { title: 'Special Terrain', animation: {page: 'specialterrain'}}
  },
  {
    path: 'new',
    component: NewKingdomComponent,
    canActivate: [AuthGuard],
    data: { title: 'New Kingdom', animation: {page: 'newkingdom'}}
  },
  {
    path: 'saved/:idc',
    component: SavedKingdomsContainerComponent,
    canActivate: [AuthGuard],
    data: { title: 'Saved Kingdoms', animation: {page: 'newkingdom'}}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
