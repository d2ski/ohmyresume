import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { appRoutes } from './app.routes';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { APP_CONFIG } from './core/app-config';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(appRoutes),
    importProvidersFrom(TuiRootModule),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
};
