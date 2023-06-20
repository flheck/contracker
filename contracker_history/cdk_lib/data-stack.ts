import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AttributeType, ITable, Table } from "aws-cdk-lib/aws-dynamodb";
import { getSuffixFromStack } from "./utils";

export class DataStack extends Stack {
  public readonly historyContractsTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const suffix = getSuffixFromStack(this);

    this.historyContractsTable = new Table(this, "HistoryContractsTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: `HistoryContractsTable-${suffix}`,
    });
  }
}
