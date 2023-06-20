export class Contract {
  constructor(
    public company_name: string,
    public contract_name: string,
    public start_date: string,
    public cancellation_period: string,
    public cost: string,
    public currency: string,
    public id?: string
  ) {}
}
