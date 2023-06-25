import { Component, Input, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IContract } from 'src/app/shared/model/IContract';

@Component({
  selector: 'app-line-cost-progression',
  templateUrl: './line-cost-progression.component.html',
  styleUrls: ['./line-cost-progression.component.scss'],
})
export class LineCostProgressionComponent {
  @Input() contractData: IContract[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {}

  ngOnInit() {
    this.updateLineChartData();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [0, 0, 0, 0, 0],
        label: 'Added fix costs per year',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['2019', '2020', '2021', '2022', '2023'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public updateLineChartData(): void {
    let cost2019 = 0,
      cost2020 = 0,
      cost2021 = 0,
      cost2022 = 0,
      cost2023 = 0;
    for (const item of this.contractData) {
      if (item.start_date.split('.').pop() === '2019') {
        cost2019 += parseFloat(item.cost);
      }

      if (item.start_date.split('.').pop() === '2020') {
        cost2020 += parseFloat(item.cost);
      }

      if (item.start_date.split('.').pop() === '2021') {
        cost2021 += parseFloat(item.cost);
      }

      if (item.start_date.split('.').pop() === '2022') {
        cost2022 += parseFloat(item.cost);
      }

      if (item.start_date.split('.').pop() === '2023') {
        cost2023 += parseFloat(item.cost);
      }
    }

    cost2019 = Math.round((cost2019 + Number.EPSILON) * 100) / 100;
    cost2020 = Math.round((cost2020 + Number.EPSILON) * 100) / 100;
    cost2021 = Math.round((cost2021 + Number.EPSILON) * 100) / 100;
    cost2022 = Math.round((cost2022 + Number.EPSILON) * 100) / 100;
    cost2023 = Math.round((cost2023 + Number.EPSILON) * 100) / 100;

    this.lineChartData.datasets[0].data = [
      cost2019,
      cost2020,
      cost2021,
      cost2022,
      cost2023,
    ];

    this.chart?.update();
  }
}
