import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { ContractOverviewComponent } from './pages/contract-overview/contract-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CreateContractComponent } from './pages/contract-overview/create-contract/create-contract.component';
import { EditContractComponent } from './pages/contract-overview/edit-contract/edit-contract.component';
import { HistoryContractOverviewComponent } from './pages/history-contract-overview/history-contract-overview.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main', component: MainComponent },
  {
    path: 'contracts',
    component: ContractOverviewComponent,
  },
  { path: 'contracts/create', component: CreateContractComponent },
  { path: 'contracts/edit', redirectTo: '/contracts', pathMatch: 'full' },
  { path: 'contracts/edit/:id', component: EditContractComponent },
  {
    path: 'history_contracts',
    component: HistoryContractOverviewComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
