import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';
import { Command } from '../model/commands.model';

const sqsClient = new SQSClient({
  region: 'us-east-1',
  endpoint: 'https://localhost.localstack.cloud:4566',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
});

@Injectable()
export class CommandsService {
  async addCommand(action: string, machineId: string): Promise<Command> {
    const newCommand: Command = new Command(machineId, `cmd: ${action}`);

    const sendCommand = new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(newCommand),
    });

    try {
      await sqsClient.send(sendCommand);

      const response = await this.waitForResponse();

      return response;
    } catch (e) {
      console.error(`Error handling SQS messages: ${e}`);
      throw new InternalServerErrorException('Error sending/receiving message from SQS.');
    }
  }

  private async waitForResponse(): Promise<any> {
    const receiveCommand = new ReceiveMessageCommand({
      QueueUrl: process.env.SQS_RESPONSE_URL,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 600,
    });

    try {
      const response = await sqsClient.send(receiveCommand);

      if (!response.Messages || response.Messages.length === 0) {
        throw new BadRequestException('No messages found in the response queue.');
      }

      const message = response.Messages[0];
      const commandResponse = JSON.parse(message.Body);

      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: process.env.SQS_RESPONSE_URL,
          ReceiptHandle: message.ReceiptHandle,
        }),
      );

      return commandResponse;
    } catch (e) {
      console.error(`Error receiving response: ${e}`);
      throw new InternalServerErrorException('Error receiving message from SQS response queue.');
    }
  }
}
