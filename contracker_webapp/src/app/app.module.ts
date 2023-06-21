// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './pages/main/main.component';
import { ContractOverviewComponent } from './pages/contract-overview/contract-overview.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './pages/contract-overview/table/table.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CreateContractComponent } from './pages/contract-overview/create-contract/create-contract.component';
import { EditContractComponent } from './pages/contract-overview/edit-contract/edit-contract.component';
import { ContractFormComponent } from './components/forms/contract-form/contract-form.component';
import { HistoryContractOverviewComponent } from './pages/history-contract-overview/history-contract-overview.component';
import { HistoryTableComponent } from './pages/history-contract-overview/history-table/history-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    ContractOverviewComponent,
    NotFoundComponent,
    FooterComponent,
    TableComponent,
    MessagesComponent,
    CreateContractComponent,
    EditContractComponent,
    ContractFormComponent,
    HistoryContractOverviewComponent,
    HistoryTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //Material
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
