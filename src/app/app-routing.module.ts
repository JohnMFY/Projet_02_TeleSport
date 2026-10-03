import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/home/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from "./pages/country/country-detail.component";
import { guardCountryGuard } from "./guard-country.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path : 'country/:countryId',
    component : CountryDetailComponent,
    canActivate: [guardCountryGuard]
  },

  {
    path : 'not-found',
    component : NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
