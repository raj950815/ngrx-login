import { 
    ActionReducer,
    ActionReducerMap,
    MetaReducer
 } from '@ngrx/store';

 import { environment } from 'src/environments/environment';
 import * as fromUser from 'src/app/state/reducers/user.reducer';

export interface State {
    user: fromUser.UserState,
} 

export const initialState: State = {
    user: fromUser.initialState,
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State = initialState, action: any): State {
        console.log('state ', state);
        console.log('action ', action);
        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
