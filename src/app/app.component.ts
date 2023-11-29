import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authAction from './store/auth/auth.actions';
import { selectIsAuthenticated } from './store/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store) {}

  isAuthenticated$: Observable<boolean> = new Observable<boolean>();

  ngOnInit(): void {
    this.store.dispatch(authAction.onLoad());
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }
}
