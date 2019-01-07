import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor( private router: Router,
        private store: Store<State>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = null;
        this.store.pipe(select(state => state.user))
        .subscribe( user => { currentUser = user.token })
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}