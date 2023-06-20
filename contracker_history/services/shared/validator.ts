import { IHContract } from "../model/IModel";

export class MissingFieldError extends Error {
  constructor(missingField: string) {
    super(`Value for ${missingField} expected!`);
  }
}

export class JsonError extends Error {}

export function validateAsContractEntry(arg: any) {
  if ((arg as IHContract).id == undefined) {
    throw new MissingFieldError("id");
  }
  if ((arg as IHContract).company_name == undefined) {
    throw new MissingFieldError("company_name");
  }
  if ((arg as IHContract).contract_name == undefined) {
    throw new MissingFieldError("contract_name");
  }
  if ((arg as IHContract).cancellation_period == undefined) {
    throw new MissingFieldError("cancellation_period");
  }
  if ((arg as IHContract).start_date == undefined) {
    throw new MissingFieldError("start_date");
  }
  if ((arg as IHContract).cost == undefined) {
    throw new MissingFieldError("cost");
  }
  if ((arg as IHContract).currency == undefined) {
    throw new MissingFieldError("currency");
  }
}
