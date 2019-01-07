import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as UserActions from 'src/app/state/actions/user.action';
import { User } from '../model/user';
import { State } from '../state';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient,
        private store: Store<State>) {
        this.store.dispatch(new UserActions.loginSuccess(localStorage.getItem('currentUser')));
    }

    login(user: User): Observable<User>{
        return this.http.post<User>(`/users/authenticate`, user)
            .pipe( catchError(this.handleError));
    }

    private handleError(err) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        return throwError(errorMessage);
      }
}
