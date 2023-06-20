import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract/contract.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Contract } from 'src/app/shared/model/Contract';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.scss'],
})
export class EditContractComponent {
  public contractData: Contract | undefined;

  constructor(
    private router: Router,
    private contractService: ContractService,
    private messageService: MessageService
  ) {
    const currentId = this.router.url.split('/').pop();
    if (currentId) {
      this.contractService.getContract(currentId).subscribe((response) => {
        this.contractData = response;
      });
    } else {
      this.messageService.sendMessage('Id not found');
      this.router.navigate(['contracts']);
    }
  }
}
