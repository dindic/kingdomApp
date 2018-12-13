import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as moment from 'moment';
import { HttpResponse } from '@angular/common/http';
import { User } from '../datos/class.user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
    })
};

@Injectable()
export class SignInService {

    private kingdomUrl = environment.apiUrl;

    idValor: [{id: string; num: number}];

    constructor(private http: HttpClient) {

    }

    signUp(user: User): Observable<HttpResponse<User>> {
        return this.http.post(this.kingdomUrl + `signup`, user, { observe: 'response', headers: httpOptions.headers })
        .pipe(
            // TO DO: HANDLE ERROR!!!!
            catchError(this.handleError)
        )
        .do(res => this.setSession(res));
    }

    signIn(user: string, pwd: string): Observable<HttpResponse<User>> {
        console.log(this.kingdomUrl + `signin`);
        return this.http.post<User>(this.kingdomUrl + `signin`, {email: user, password: pwd},
                                        { observe: 'response', headers: httpOptions.headers })
                .pipe(
                    // TO DO: HANDLE ERROR!!!!
                    catchError(this.handleError)
                )
                .do(res => this.setSession(res));
    }


    private setSession(authResult) {
        console.log('setsesion!');
        console.log(authResult);

        // display its headers
        const auth = authResult.headers.get('x-auth');
        console.log(auth);

        // access the body directly, which is typed as `Config`.
        const user: User = new User(authResult.body.name, '', '', auth, authResult.body._id );
        // const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('user');
    }

    public isLoggedIn(): boolean {
        // return true;
        // console.log(moment().isBefore(this.getExpiration()));
        // return moment().isBefore(this.getExpiration());
        const helper = new JwtHelperService();
        const token = this.toUser(localStorage.getItem('user')).token;
        if (token == null || token === '' ) {
            return false;
        }
        return !helper.isTokenExpired(token);
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    public toUser(data: string): User {
        const jsonData = JSON.parse(data);
        if (jsonData) {
            const user = new User(jsonData.name, jsonData.email, '', jsonData.token, jsonData._id);
            return user;
        }
        return new User('', '', '', '', '');
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
}
