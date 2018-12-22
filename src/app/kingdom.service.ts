import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { City } from './datos/class.city';
import { KINGDOM } from './datos/mock.kingdom';
import { Kingdom } from './datos/class.kingdom';
import { Leader } from './datos/class.leader';
import { District } from './datos/class.city.district';
import { User } from './datos/class.user';
import { HttpResponse } from '@angular/common/http';
import { SignInService } from './auth/signin.service';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class KingdomService {

  private kingdomUrl = environment.apiUrl;
  kingService: Kingdom;
  idValor: [{id: string; num: number}];

  constructor(private http: HttpClient) {

  }

   // POST CALLS

  newKingdom(newKingdom: Kingdom): Observable<Kingdom> {
    console.log(newKingdom);
    const idc = this.toUser(localStorage.getItem('user'))._id;
    return this.http.post<Kingdom>(this.kingdomUrl + `kingdoms/${idc}`, newKingdom, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // GET CALLS

  getKingdomsByCreator(id): Observable<Kingdom[]> {
    console.log('Get Kigndoms!');
    const headers = new HttpHeaders({'x-auth' : this.getToken(), 'Content-Type':  'application/json'});
    const test =  this.http.get<Kingdom[]>(this.kingdomUrl + `kingdoms/${id}`, {headers: headers});
    console.log(test);
    return test;
  }


  getKingdomById(id): Observable<Kingdom> {
    console.log('getKingdomById');
    const headers = new HttpHeaders({'x-auth' : this.getToken(), 'Content-Type':  'application/json'});
    return this.http.get<Kingdom>(this.kingdomUrl + `kingdom/${id}`, {headers: headers});
  }

  getKingdomByCreatorAndName(id, name): Observable<Kingdom> {
    const headers = new HttpHeaders({'x-auth' : this.getToken(), 'Content-Type':  'application/json'});
    return this.http.get<Kingdom>(this.kingdomUrl + `kingdom/${id}/${name}`,  {headers: headers});
  }

  // getDistrictById(idK, idC, idD): Observable<District> {
  //   console.log('getDistrictById');
  //   const headers = new HttpHeaders({'x-auth' : this.getToken(), 'Content-Type':  'application/json'});
  //   return this.http.get<District>(this.kingdomUrl + `district/${idK}/${idC}/${idD}`, {headers: headers});
  // }

  getKingdom(): Kingdom {
    return KINGDOM;
  }

  // PUT REQUEST
  updateKingdomById(kingdom: Kingdom, id): Observable<Kingdom> {
    console.log(kingdom);
    const idc = this.toUser(localStorage.getItem('user'))._id;
    return this.http.put<Kingdom>(this.kingdomUrl + `kingdom/${id}/${idc}`, kingdom, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateLeadersById(leaders: Leader[], id):  Observable<Kingdom> {
    console.log('updateLeadersById');
    const idc = this.toUser(localStorage.getItem('user'))._id;
    return this.http.patch<Leader[]>(this.kingdomUrl + `kingdom/leaders/${id}/${idc}`, leaders, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateDistrictById(districts: District[], id, idc):  Observable<Kingdom> {
    console.log('updateDistrictById' + idc);
    return this.http.patch<District[]>(this.kingdomUrl + `kingdom/districts/${id}/${idc}`, districts, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateCitiesById(cities: City[], id):  Observable<Kingdom> {
    console.log('updateCitiesById');
    const idc = this.toUser(localStorage.getItem('user'))._id;
    return this.http.patch<City[]>(this.kingdomUrl + `kingdom/cities/${id}/${idc}`, cities, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateImprovementsById(improvements, id):  Observable<Kingdom> {
    console.log('updateLeadersById');
    const idc = this.toUser(localStorage.getItem('user'))._id;
    return this.http.patch(this.kingdomUrl + `kingdom/improvements/${id}/${idc}`, improvements, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  // Other functions
  getDistrict(city: number, district: number): District {
    if (this.kingService) {
      return this.kingService.cities[city].districts[district];
    } else {
      return KINGDOM.cities[city].districts[district];
    }
  }


  setKingdomLeaders(leaders: Leader[]): void {
    // this.kingService = KINGDOM;
    this.kingService.leaders = leaders;
  }

  setKingdomCities(cities: City[]): void {
    // this.kingService = KINGDOM;
    this.kingService.cities = cities;
  }

  setKingdomImprovements(idValor): void {
    this.kingService.improvements = idValor;
  }

  setKingdomTerrains(idValor): void {
    this.kingService.specialTerrain = idValor;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return _throw(new Error ('Something bad happened; please try again later.'));
  }

  public getToken() {
      let token = '';
      const userstring: string = localStorage.getItem('user');
      token = this.toUser(userstring).token;

      return token;
  }

  public toUser(data: string): User {
    const jsonData = JSON.parse(data);

    const user = new User(jsonData.name, jsonData.email, '', jsonData.token, jsonData._id);
    return user;
  }
}
