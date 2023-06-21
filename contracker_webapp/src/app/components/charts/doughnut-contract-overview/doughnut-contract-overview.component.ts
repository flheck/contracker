import { Component, Input, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-contract-overview',
  templateUrl: './doughnut-contract-overview.component.html',
  styleUrls: ['./doughnut-contract-overview.component.scss'],
})
export class DoughnutContractOverviewComponent {
  @Input() contractDataLength: number = 0;
  @Input() historyContractDataLength: number = 0;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  // Doughnut
  public doughnutChartLabels: string[] = ['Contracts', 'History Contracts'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [this.contractDataLength, this.historyContractDataLength] },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit() {
    this.updateDoughnutChartData();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  updateDoughnutChartData() {
    this.doughnutChartData.datasets[0].data = [
      this.contractDataLength,
      this.historyContractDataLength,
    ];

    this.chart?.update();
  }
}
