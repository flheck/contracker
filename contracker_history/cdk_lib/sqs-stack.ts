import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

export class SqsStack extends Stack {
  public readonly sqsEventSource: SqsEventSource;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // https://awstip.com/using-a-lambda-trigger-to-send-a-message-to-sqs-1db1090d5ba8
    // https://cloudkatha.com/send-message-to-sqs-from-aws-lambda-using-node-js-18/
    const queue = new Queue(this, "HistoryContractSqsQueue", {
      visibilityTimeout: Duration.seconds(30),
    });

    this.sqsEventSource = new SqsEventSource(queue);
  }
}
