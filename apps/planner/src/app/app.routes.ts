import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@life/fe/calendar').then((m) => m.frontendFeatureCalendarRoutes)
  }
];
