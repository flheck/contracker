import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-overview',
  templateUrl: './contract-overview.component.html',
  styleUrls: ['./contract-overview.component.scss'],
})
export class ContractOverviewComponent {
  constructor(private router: Router) {}

  navigateToCreatePage() {
    this.router.navigate(['contracts', 'create']);
  }
}
