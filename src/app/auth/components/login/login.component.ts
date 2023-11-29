import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as authActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) {
    this.loginForm = this.formBuilder.group(
      {
        login: [null, [Validators.required]],
        password: [null, [Validators.required]],
      },
      { updateOn: 'submit' },
    );
  }

  submit(): void {
    console.log(this.loginForm.value);
    this.store.dispatch(authActions.login({ model: this.loginForm.value }));
  }
}
