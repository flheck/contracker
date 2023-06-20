import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract/contract.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Contract } from 'src/app/shared/model/Contract';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent {
  @Input() contractData?: Contract;
  model = new Contract('', '', '', '', '', '');

  constructor(
    private contractService: ContractService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.contractData) {
      const _c = this.contractData;
      this.model = new Contract(
        _c.company_name,
        _c.contract_name,
        _c.start_date,
        _c.cancellation_period,
        _c.cost,
        _c.currency,
        _c.id
      );
    }
  }

  onSubmit() {
    const formData = this.model;
    if (formData.id) {
      this.contractService
        .putContract(formData.id, formData)
        .subscribe((response) => {
          // this.messageService.sendMessage(`Created: ${response.ids[0]}`);
          console.log(response);
          this.router.navigate(['contracts']);
        });
    } else {
      // backend sets the id
      delete formData.id;
      const transformedFormData = [formData];
      this.contractService
        .postContract(transformedFormData)
        .subscribe((response) => {
          this.messageService.sendMessage(`Created: ${response.ids[0]}`);
          this.newContract();
        });
    }
  }

  newContract() {
    this.model = new Contract('', '', '', '', '', '');
  }
}
