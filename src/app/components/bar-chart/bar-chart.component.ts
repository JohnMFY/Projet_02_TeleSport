import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit {

  public barChart!: Chart<"bar", number[], string>;

    @Input() labels: string[] = [];
    @Input() values: number[] = [];

  constructor(private router: Router) {}

    ngAfterViewInit() {
        this.buildBarChart(
            this.labels,
            this.values
        );
    }
    buildBarChart(labels: string[], values: number[]) {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const barChart = new Chart("DashboardBarChart", {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
            label: 'Medals',
            data: values,
            backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
            }],
        },
        options: {
            indexAxis: isMobile ? 'y' : 'x',
            aspectRatio: isMobile ? 1.5 : 2.5,
            onClick: (e) => {
            if (e.native) {
                const points = barChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
                if (points.length) {
                const firstPoint = points[0];
                const countryName = barChart.data.labels ? barChart.data.labels[firstPoint.index] : '';
                this.router.navigate(['country', countryName]);
                }
            }
            }
        }
        });
        this.barChart = barChart;
    }
}