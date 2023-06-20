import { Injectable } from '@angular/core';
import { IContract } from 'src/app/shared/model/IContract';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contractUrl =
    'https://xh4tq4wb8j.execute-api.eu-central-1.amazonaws.com/prod/contracts';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getContracts(): Observable<IContract[]> {
    const contracts = this.http.get<IContract[]>(this.contractUrl);
    this.messageService.sendMessage('Contracts Loaded');
    return contracts;
  }

  postContract(body: IContract[]): Observable<any> {
    const response = this.http.post<string>(
      this.contractUrl,
      JSON.stringify(body)
    );
    return response;
  }

  deleteContract(id: string): Observable<any> {
    const options = { params: new HttpParams().set('id', id) };
    const response = this.http.delete(this.contractUrl, options);
    return response;
  }
}
