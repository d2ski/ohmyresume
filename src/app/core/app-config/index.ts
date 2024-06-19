import { InjectionToken } from '@angular/core';

interface AppConfig {
  pdfApiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('Application config');
