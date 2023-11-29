import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly store: Store) {}

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
