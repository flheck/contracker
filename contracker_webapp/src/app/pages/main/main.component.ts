import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ContractService } from 'src/app/services/contract/contract.service';
import { HistoryContractService } from 'src/app/services/history-contract/history-contract.service';
import { IContract } from 'src/app/shared/model/IContract';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public isLoading = true;
  public contractData: IContract[] = [];
  public historyContractData: IContract[] = [];

  constructor(
    private contractService: ContractService,
    private historyContractService: HistoryContractService
  ) {}

  ngOnInit() {
    this.getChartData();
  }

  getChartData() {
    forkJoin([
      this.contractService.getContracts(),
      this.historyContractService.getHistoryContracts(),
    ])
      // Array destructuring, a cool EcmaScript 6 feature.
      .subscribe(([contracts, historyContracts]) => {
        this.contractData = contracts;
        this.historyContractData = historyContracts;
        this.isLoading = false;
      });
  }
}
