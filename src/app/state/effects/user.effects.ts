import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/user.action';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable()
export class UserEffects {

  constructor(private userService: AuthenticationService,
              private actions$: Actions) { }

      @Effect()
      loadloginUser$: Observable<Action> = this.actions$.pipe(
        ofType(UserActions.UserActionTypes.login),
        map((action: UserActions.login) => action.payload),
        mergeMap((idpass: User) =>
          this.userService.login(idpass).pipe(
            map((user: User) => (new UserActions.loginSuccess(user.token))),
            catchError(err => of(new UserActions.loginFail(err)))
          )
        )
      );

}