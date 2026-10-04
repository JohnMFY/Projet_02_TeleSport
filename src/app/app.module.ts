import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailComponent } from "./pages/country/country-detail.component";
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, NotFoundComponent, CountryDetailComponent, BarChartComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
