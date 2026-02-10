import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: 'footer',
        loadComponent: () => import('./shared/components/layout/footer/footer.component').then(m => m.FooterComponent)
   },
    { 
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
   },
       { 
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
   },
];
