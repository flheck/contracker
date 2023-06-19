import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Services
import { MessageService } from 'src/app/services/message/message.service';
import { ContractService } from 'src/app/services/contract/contract.service';

// Shared
import { IContract } from 'src/app/shared/model/IContract';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnDestroy {
  subscription: Subscription;

  constructor(
    public messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {
    this.subscription = this.messageService.onMessage().subscribe((message) => {
      this.openSnackBar(message.text);
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
