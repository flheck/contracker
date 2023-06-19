import { Injectable } from '@angular/core';
import { IContract } from 'src/app/shared/model/IContract';
import { Observable } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const CONTRACT_DATA: IContract[] = [
  {
    id: '03e9c596-daf5-44ec-86fb-206a28ee39f5',
    company_name: 'Strosin, Reinger and Lindgren',
    contract_name: 'TYE',
    start_date: '1592185444000',
    cancellation_period: 'month',
    cost: 51.51,
    currency: 'Euro',
  },
  {
    id: '1d7fbbc4-345b-4cd9-9ea4-213ad0e5e706',
    company_name: 'Volkman-Parisian',
    contract_name: 'DAOR',
    start_date: '1557774856000',
    cancellation_period: 'month',
    cost: 5.74,
    currency: 'Euro',
  },
  {
    id: '45bc83ff-e091-4bba-9b5a-2058fe7d21e1',
    company_name: 'Sipes-Hilpert',
    contract_name: 'BIBV',
    start_date: '1617931429000',
    cancellation_period: 'month',
    cost: 55.46,
    currency: 'Euro',
  },
  {
    id: '35f87088-0e1a-449f-8971-aabf1f396054',
    company_name: 'Volkman and Sons',
    contract_name: 'UIKE',
    start_date: '1599852260000',
    cancellation_period: 'month',
    cost: 74.84,
    currency: 'Euro',
  },
  {
    id: 'b847bcce-f0d4-4a51-9f5a-a5cba1594834',
    company_name: 'Altenwerth Group',
    contract_name: 'VABV',
    start_date: '1597255527000',
    cancellation_period: 'month',
    cost: 75.51,
    currency: 'Euro',
  },
  {
    id: '73471d90-9613-41cd-9ea7-3eb6983727a3',
    company_name: 'Mitchell-Kreiger',
    contract_name: 'UTNN',
    start_date: '1609372081000',
    cancellation_period: 'year',
    cost: 80.83,
    currency: 'Euro',
  },
  {
    id: '18bee1a7-23b2-498a-893e-cda9d199a452',
    company_name: 'Dach-Murray',
    contract_name: 'VEBS',
    start_date: '1574981122000',
    cancellation_period: 'month',
    cost: 49.62,
    currency: 'Euro',
  },
  {
    id: '236adfe5-f5e0-4515-a357-6537841c4011',
    company_name: 'Wilderman, Rutherford and Schuppe',
    contract_name: 'YSVP',
    start_date: '1622864503000',
    cancellation_period: 'month',
    cost: 56.07,
    currency: 'Euro',
  },
  {
    id: '3ca13374-67eb-4c4f-8562-3dbdc5b95c45',
    company_name: 'Nicolas-Funk',
    contract_name: 'YUSL',
    start_date: '1588983498000',
    cancellation_period: 'year',
    cost: 94.31,
    currency: 'Euro',
  },
  {
    id: 'df8d86fe-d58a-4f9a-bdea-8e80194fdf1c',
    company_name: 'Considine, Powlowski and Blick',
    contract_name: 'ZUDC',
    start_date: '1585241679000',
    cancellation_period: 'month',
    cost: 31.1,
    currency: 'Euro',
  },
  {
    id: 'dfe12cbb-f106-4afe-99c5-c6241b5ac146',
    company_name: 'Sipes, Connelly and Hegmann',
    contract_name: 'SAEZ',
    start_date: '1629564632000',
    cancellation_period: 'year',
    cost: 85.59,
    currency: 'Euro',
  },
  {
    id: '3c37f80c-bd7f-4cbe-884d-419b2edee70f',
    company_name: 'Kub, Armstrong and Hoppe',
    contract_name: 'FTTB',
    start_date: '1617570421000',
    cancellation_period: 'year',
    cost: 2.2,
    currency: 'Euro',
  },
  {
    id: '9a5720b7-acf5-466f-9a4e-f245523ec40d',
    company_name: 'Greenholt, Ullrich and Zulauf',
    contract_name: 'KMJX',
    start_date: '1594120117000',
    cancellation_period: 'year',
    cost: 7.67,
    currency: 'Euro',
  },
  {
    id: 'f30f53d9-ce8e-4ec6-9b51-97d855a333a9',
    company_name: 'Pouros, Kuvalis and Ankunding',
    contract_name: 'KBFL',
    start_date: '1599257271000',
    cancellation_period: 'month',
    cost: 22.83,
    currency: 'Euro',
  },
  {
    id: '65cd1068-0083-4ab2-a9db-7ef7bd67b80b',
    company_name: 'Moore, Kuhlman and Weissnat',
    contract_name: 'OIBB',
    start_date: '1562797197000',
    cancellation_period: 'year',
    cost: 27.28,
    currency: 'Euro',
  },
  {
    id: 'c7fb9d0f-6732-4a59-adfc-ee561a5f6bb5',
    company_name: 'Paucek, Franecki and Hand',
    contract_name: 'MUVR',
    start_date: '1551936001000',
    cancellation_period: 'year',
    cost: 16.53,
    currency: 'Euro',
  },
  {
    id: '3ef21828-9f90-421b-a3c5-56611a66fbf2',
    company_name: 'Kulas, Prosacco and Purdy',
    contract_name: 'FADQ',
    start_date: '1608754322000',
    cancellation_period: 'month',
    cost: 81.8,
    currency: 'Euro',
  },
  {
    id: 'ab8d4952-b0eb-49a5-bd98-452676ef0165',
    company_name: 'Kshlerin Group',
    contract_name: 'KESF',
    start_date: '1548955066000',
    cancellation_period: 'year',
    cost: 26.79,
    currency: 'Euro',
  },
  {
    id: 'd6e96137-df6a-4d9d-a31e-467cc04566ce',
    company_name: 'King-Lemke',
    contract_name: 'RPMW',
    start_date: '1559356350000',
    cancellation_period: 'year',
    cost: 7.24,
    currency: 'Euro',
  },
  {
    id: '4d2794a4-622a-40a5-8a34-8014eb6c7374',
    company_name: 'Nicolas Group',
    contract_name: 'RPMW',
    start_date: '1605465535000',
    cancellation_period: 'year',
    cost: 90.04,
    currency: 'Euro',
  },
];

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
    console.log(contracts);
    this.messageService.sendMessage('Contracts Loaded');
    return contracts;
  }
}
