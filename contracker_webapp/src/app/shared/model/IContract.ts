export interface IContract {
  id?: string;
  company_name: string;
  contract_name: string;
  start_date: string;
  cancellation_period: string;
  cost: string;
  currency: string;
}

export interface IResponseMessage {
  message: string;
}
