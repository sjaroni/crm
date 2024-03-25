import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'simple-crm-de453',
          appId: '1:1038402236916:web:66b1ea4d683e391d0449a1',
          storageBucket: 'simple-crm-de453.appspot.com',
          apiKey: 'AIzaSyBFanNoM2NhnvLZXlT2Qadaqya-WmvTcD0',
          authDomain: 'simple-crm-de453.firebaseapp.com',
          messagingSenderId: '1038402236916',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
