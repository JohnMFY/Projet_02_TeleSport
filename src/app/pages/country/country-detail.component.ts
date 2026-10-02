import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  public years: string[] = [];
  public medals: number[] = [];
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }
  
  ngOnInit() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
    this.dataService.getOlympics().subscribe(
      (data) => {
        if (data && data.length > 0) {
          const selectedCountry = data.find(country => country.country === countryName);
          if (selectedCountry) {
            this.titlePage = selectedCountry.country;
            this.totalEntries = selectedCountry.participations.length;
            this.years = selectedCountry.participations.map(
            participation => participation.year.toString()
          );
          this.medals = selectedCountry.participations.map(participation => participation.medalsCount);
          this.totalMedals = this.medals.reduce((total, medal) => total + medal,0);
          this.totalAthletes = selectedCountry.participations.reduce((total, participation) => total + participation.athleteCount,0);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.message
      }
    );
  }
}
