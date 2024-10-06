import { Injectable } from "@nestjs/common";
import { Commands } from "../models/command.model"
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommandsService {

    private commandQueue: Commands[] = [];

    addCommand(action: string, params: any): Commands{
        const newCommand: Commands = {
            id: uuidv4(),
            action,
            params,
            createdAt: new Date(),
            status: "queued"
        };
        this.commandQueue.push(newCommand);
        return newCommand;
    }

    getNextCommand(): Commands | string{

        if(!this.commandQueue){
            return 'Nenhum comando na fila';
        }

        return this.commandQueue.shift();
    }

    getAllCommands(): Commands[]{
        return this.commandQueue;
    }

}