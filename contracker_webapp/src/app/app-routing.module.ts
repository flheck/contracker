import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { ContractOverviewComponent } from './pages/contract-overview/contract-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'contracts', component: ContractOverviewComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
