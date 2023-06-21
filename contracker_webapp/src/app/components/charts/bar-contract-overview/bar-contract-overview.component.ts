import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { IContract } from 'src/app/shared/model/IContract';

@Component({
  selector: 'app-bar-contract-overview',
  templateUrl: './bar-contract-overview.component.html',
  styleUrls: ['./bar-contract-overview.component.scss'],
})
export class BarContractOverviewComponent {
  @Input() contractData: IContract[] = [];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['Total'],
    datasets: [
      { data: [0], label: '2019' },
      { data: [0], label: '2020' },
      { data: [0], label: '2021' },
      { data: [0], label: '2022' },
      { data: [0], label: '2023' },
    ],
  };

  constructor() {}

  ngOnInit() {
    this.updateBarChartData();
  }

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

  public updateBarChartData(): void {
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

      cost2023 += parseFloat(item.cost);
    }

    cost2019 = Math.round((cost2019 + Number.EPSILON) * 100) / 100;
    cost2020 = Math.round((cost2020 + Number.EPSILON) * 100) / 100;
    cost2021 = Math.round((cost2021 + Number.EPSILON) * 100) / 100;
    cost2022 = Math.round((cost2022 + Number.EPSILON) * 100) / 100;
    cost2023 = Math.round((cost2023 + Number.EPSILON) * 100) / 100;

    this.barChartData.datasets[0].data = [cost2019];
    this.barChartData.datasets[1].data = [cost2019 + cost2020];
    this.barChartData.datasets[2].data = [cost2019 + cost2020 + cost2021];
    this.barChartData.datasets[3].data = [
      cost2019 + cost2020 + cost2021 + cost2022,
    ];
    this.barChartData.datasets[4].data = [cost2023];

    this.chart?.update();
  }
}
