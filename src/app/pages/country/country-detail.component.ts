import {HttpErrorResponse} from '@angular/common/http';
import { Component, DestroyRef, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  public years: string[] = [];
  public medals: number[] = [];
  public headerData: { label: string; value: number }[] = [];
  public countryFlag: string = '';
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  private countryFlags: { [key: string]: string } = {
    France: 'assets/images/FR.png',
    Germany: 'assets/images/DE.png',
    Italy: 'assets/images/IT.png',
    Spain: 'assets/images/ES.png',
    'United States': 'assets/images/US.png'
  };
  public isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private dataService: DataService, private destroyRef: DestroyRef) { }
  
  ngOnInit() {
    let countryId: number = 0;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((param: ParamMap) => countryId = Number(param.get('countryId')));
    this.dataService.getOlympics().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (data) => {
        this.isLoading = false;
        if (data && data.length > 0) {
          const selectedCountry = data.find(country => country.id === countryId);
          if (selectedCountry) {
            this.countryFlag = this.countryFlags[selectedCountry.country] ?? '';
            this.titlePage = selectedCountry.country;
            this.totalEntries = selectedCountry.participations.length;
            this.years = selectedCountry.participations.map(
            participation => participation.year.toString()
            );
            this.medals = selectedCountry.participations.map(participation => participation.medalsCount);
            this.totalMedals = this.medals.reduce((total, medal) => total + medal,0);
            this.totalAthletes = selectedCountry.participations.reduce((total, participation) => total + participation.athleteCount,0);
            this.headerData = [
              {
                label: 'Number of entries',
                value: this.totalEntries
              },
              {
                label: 'Total Number of medals',
                value: this.totalMedals
              },
              {
                label: 'Total Number of athletes',
                value: this.totalAthletes
              }
            ];
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = 'Unable to load data. Please try again later.';
      }
    );
  }
}