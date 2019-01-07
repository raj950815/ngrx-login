import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as UserAction from 'src/app/state/actions/user.action';
import { State } from 'src/app/state';
import { Store, select } from '@ngrx/store';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    constructor(private store: Store<State>,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.store.pipe(select( state => state.user))
        .subscribe( err => {
            this.loading = false;
            this.error = err.error;
        });
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.store.pipe(select( state => state.user.token))
        .subscribe( user => {
            this.router.navigate([this.returnUrl]);
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.store.dispatch(new UserAction.login(this.loginForm.value));
        this.store.pipe(select(state => state.user))
        .pipe(first()).subscribe( user => {this.router.navigate([this.returnUrl]);});
    }
}
