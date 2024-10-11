import { Injectable } from "@nestjs/common";
import { Commands } from "../models/command.model"
import { v4 as uuidv4 } from 'uuid';
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
    }
});

@Injectable()
export class CommandsService {

    async addCommand(action: string, params: any): Promise<Commands> {
        const newCommand: Commands = {
            id: uuidv4(),
            action,
            params,
            createdAt: new Date(),
            status: "queued"
        };
        
        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            MessageBody: JSON.stringify(newCommand)
        });

        await sqsClient.send(command);
        return newCommand;
    }

    async getNextCommand(): Promise<Commands | string>{

        const command = new ReceiveMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            MaxNumberOfMessages: 1,
          });
      
          const response = await sqsClient.send(command);
      
          if (!response.Messages || response.Messages.length === 0) {
            return 'Nenhum comando na fila';
          }
      
          const message = response.Messages[0];
          const commandData: Commands = JSON.parse(message.Body);
      
          await sqsClient.send(
            new DeleteMessageCommand({
              QueueUrl: process.env.SQS_QUEUE_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
      
          return commandData;
    }
}