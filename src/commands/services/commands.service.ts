import { Injectable } from "@nestjs/common";
import { Commands } from "@prisma/client"
import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { MachinesService } from "src/machines/service/machines.service";
import { PrismaService } from "prisma/service/prisma.service";

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

  constructor(
    private prisma: PrismaService,
    private readonly machinesService: MachinesService){}

    async addCommand(action: string, params: any, machineId: string): Promise<Commands> {

      const machineIp = await this.machinesService.getMachineIp(machineId);

        const newCommand: Commands = await this.prisma.commands.create({
          data: {
            machineIp,
            action,
            params,
            status: "queued"
          }
      });
        
        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            MessageBody: JSON.stringify(newCommand)
        });

        await sqsClient.send(command);
        return newCommand;
    }

    async getResponseCommand(): Promise<Commands | string>{

        const command = new ReceiveMessageCommand({
            QueueUrl: process.env.SQS_RESPONSE_URL, 
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
              QueueUrl: process.env.SQS_RESPONSE_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
      
          return commandData;
    }
}