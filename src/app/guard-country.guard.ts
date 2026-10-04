import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { DataService } from './services/data.service';

export const guardCountryGuard: CanActivateFn = (route, state) => {

  const dataService = inject(DataService);
  const router = inject(Router);
  const countryId = Number(route.paramMap.get('countryId'));

  return dataService.getOlympics().pipe(
    map(data => {
      const countryExists = data.some(country => country.id === countryId);
      if (countryExists) {return true;}
      return router.createUrlTree(
        ['/not-found'],
        { queryParams: { reason: 'country' } }
      );
    }),

    catchError(() => {
      return of(router.createUrlTree(['/not-found']));
    })
  );
};