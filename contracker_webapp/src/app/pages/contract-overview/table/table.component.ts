import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { IContract } from 'src/app/shared/model/IContract';

// Services
import { ContractService } from 'src/app/services/contract/contract.service';

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

  constructor(private contractService: ContractService) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getContracts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteItem(id: string) {
    console.log(id);
  }

  editItem(id: string) {
    console.log(id);
  }

  getContracts(): void {
    this.contractService.getContracts().subscribe((contracts) => {
      this.contracts = contracts;
      this.dataSource = new MatTableDataSource<IContract>(this.contracts);
    });
  }
}
