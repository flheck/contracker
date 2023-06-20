import { Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract/contract.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Contract } from 'src/app/shared/model/Contract';
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent {
  model = new Contract('', '', '', '', '', '');

  constructor(
    private contractService: ContractService,
    private messageService: MessageService
  ) {}

  onSubmit() {
    const formData = [this.model];
    if (formData[0].id) {
      // PUT
    } else {
      // backend sets the id
      delete formData[0].id;
      this.contractService.postContract(formData).subscribe((response) => {
        this.messageService.sendMessage(`Created: ${response.ids[0]}`);
        this.newContract();
      });
    }
  }

  newContract() {
    this.model = new Contract('', '', '', '', '', '');
  }
}
