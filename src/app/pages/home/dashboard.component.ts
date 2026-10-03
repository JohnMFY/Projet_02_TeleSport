import {HttpErrorResponse} from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public countries: string[] = [];
  public sumOfAllMedalsYears: number[] = [];
  public headerData: { label: string; value: number }[] = [];
  public countryIds: number[] = [];
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  titlePage: string = "Medals per Country";
  public isLoading: boolean = true;

  constructor(private router: Router, private dataService: DataService, private destroyRef: DestroyRef) { }

  ngOnInit() {
    this.dataService.getOlympics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (data) => {
        this.isLoading = false;
        if (data && data.length > 0) {
          this.totalJOs = Array.from(new Set(data.map(i =>i.participations.map(f => f.year)).flat())).length;
          const countriesWithMedals = data.map(country => {
            const totalMedals = country.participations.reduce((acc, participation) => acc + participation.medalsCount,0);
              return {
                id: country.id,
                country: country.country,
                totalMedals: totalMedals
              };
          });
          countriesWithMedals.sort((a, b) => b.totalMedals - a.totalMedals);
          this.countries = countriesWithMedals.map(item => item.country);
          this.sumOfAllMedalsYears = countriesWithMedals.map(item => item.totalMedals);
          this.countryIds = countriesWithMedals.map(item => item.id);
          this.totalCountries = this.countries.length;
          this.headerData = [
            {
              label: 'Number of countries',
              value: this.totalCountries
            },
            {
              label: 'Number of JOs',
              value: this.totalJOs
            }
          ];
        }
      },
      (error:HttpErrorResponse) => {
        this.error = 'Unable to load data. Please try again later.';
      }
    )
  }
  onCountryClick(index: number) {
    const countryId = this.countryIds[index];

    this.router.navigate(['country', countryId]);
  }
}