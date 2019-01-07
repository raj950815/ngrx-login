import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { State } from './state';
import { Store, select } from '@ngrx/store';
import * as UserAction from 'src/app/state/actions/user.action';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: string;

    constructor(private store: Store<State>,
        private router: Router
    ) {
        this.store.pipe(select(state => state.user))
        .subscribe( user => { this.currentUser = user.token })
    }

    logout() {
        this.store.dispatch(new UserAction.logout());
         this.router.navigate(['/login']);
    }
}
