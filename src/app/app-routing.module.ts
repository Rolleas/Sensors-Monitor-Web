import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { unauthGuard } from './core/guard/unauth.guard';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [unauthGuard],
  },
  {
    path: 'sensor',
    loadChildren: () => import('./sensor/sensor.module').then((m) => m.SensorModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
