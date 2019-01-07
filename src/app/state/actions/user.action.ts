
import { User } from 'src/app/model/user';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
    login = '[User] login',
    loginSuccess = '[User] loginSuccess',
    loginFail = '[User] loginFail',
    logout = '[User] logout'
}

export class login implements Action {
    readonly type = UserActionTypes.login;
    constructor(public payload: User) {}
}

export class loginSuccess implements Action {
    readonly type = UserActionTypes.loginSuccess;
    constructor(public payload: string) {}
}

export class loginFail implements Action {
    readonly type = UserActionTypes.loginFail;
    constructor(public payload: string) {}
}

export class logout implements Action {
    readonly type = UserActionTypes.logout;
}

export type UserActions = login | loginSuccess | loginFail | logout ;
