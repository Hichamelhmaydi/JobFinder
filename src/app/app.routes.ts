import { Routes } from '@angular/router';
import{authGuard} from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },
  {
  path: 'job/:id',
  loadComponent: () => import('./features/jobs/job-detail/job-detail.component').then(m => m.JobDetailComponent)
},
{
  path: 'favorites',
  loadChildren: () => import('./features/favorites/favorites.routes').then(m => m.FAVORITES_ROUTES)
},
  {
    path: 'applications',  
    loadComponent: () =>
      import('./features/applications/applications-list/applications-list.component').then(m => m.ApplicationsListComponent)
  },
  {
    path: 'profile',  
    loadComponent: () =>
      import('./features/profile/profile-page/profile-page.component').then(m => m.ProfileComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
