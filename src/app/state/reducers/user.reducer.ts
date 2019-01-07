import { User } from 'src/app/model/user';
import { UserActionTypes, UserActions } from './../actions/user.action';

export interface UserState {
    user: User;
    token: string;
    error: string;
}

export const initialState: UserState = {
    user: null,
    token: null,
    error: '',
}

export function reducer(state = initialState, action: UserActions): UserState {
    switch(action.type) {
        case UserActionTypes.loginSuccess:
        return { ...state, token: action.payload, error: '' };

        case UserActionTypes.loginFail:
        return { ...state, user: null, token: null, error: action.payload };

        case UserActionTypes.logout:
        localStorage.removeItem('currentUser');
        return { ...state, user: null, token: null, error: '' };

        default :
        return state
    }

}
