import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/* Initializing the firebase app before angular. */
firebase.initializeApp(environment.firebase);
/* A variable that is used to prevent the app from being bootstrapped multiple times. */
let appInit = false;

/* A listener that waits for the user to be authenticated before bootstrapping the app. */
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {

    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }
  appInit = true;
});
