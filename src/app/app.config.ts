import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import{favoritesReducer} from './store/favorites/favorites.reducer'
import{FavoritesEffects} from './store/favorites/favorites.effects'
import{applicationsReducer} from './store/applications/applications.reducer'
import{ApplicationsEffects} from './store/applications/applications.effects'

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    provideStore({ favorites: favoritesReducer ,applications: applicationsReducer}),
    provideEffects([FavoritesEffects, ApplicationsEffects]),
]
};
