import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
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
    @Output() barClicked = new EventEmitter<number>();

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
                this.barClicked.emit(firstPoint.index);
                }
            }
            }
        }
        });
        this.barChart = barChart;
    }
}