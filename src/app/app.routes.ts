import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: 'footer',
        loadComponent: () => import('./shared/components/layout/footer/footer.component').then(m => m.FooterComponent)
   },
];
