import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryContractService {
  private historyContractUrl =
    'https://82nri686p4.execute-api.eu-central-1.amazonaws.com/prod/history_contracts';

  constructor(private http: HttpClient) {}

  getHistoryContracts(): Observable<any> {
    const contracts = this.http.get<any>(this.historyContractUrl);
    return contracts;
  }
}
