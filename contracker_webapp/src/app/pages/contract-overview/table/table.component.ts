import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { IContract, IResponseMessage } from 'src/app/shared/model/IContract';

// Services
import { ContractService } from 'src/app/services/contract/contract.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public contracts: IContract[] = [];
  public displayedColumns: string[] = [
    'id',
    'company_name',
    'contract_name',
    'start_date',
    'cancellation_period',
    'cost',
    'currency',
    'edit',
    'delete',
  ];
  public dataSource!: MatTableDataSource<IContract>;

  constructor(
    private contractService: ContractService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getContracts();
  }

  deleteItem(id: string) {
    this.contractService
      .deleteContract(id)
      .subscribe((response: IResponseMessage) => {
        this.messageService.sendMessage(response.message);
        this.getContracts();
      });
  }

  editItem(id: string) {
    this.router.navigate(['contracts', 'edit', id]);
  }

  getContracts(): void {
    this.contractService.getContracts().subscribe((contracts) => {
      this.messageService.sendMessage('Contracts Loaded');
      this.contracts = contracts;
      this.dataSource = new MatTableDataSource<IContract>(this.contracts);
      // Paginator has to be initialized after data loaded: https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized
      this.dataSource.paginator = this.paginator;
    });
  }
}
