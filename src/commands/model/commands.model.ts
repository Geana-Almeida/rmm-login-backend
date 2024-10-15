import { v4 as uuidv4 } from 'uuid'
import { IsString, IsNotEmpty } from 'class-validator';

export class Command {
    id: string;
    @IsString()
    @IsNotEmpty()
    machineIp: string;
    action: string;
    params: any;
    createdAt: Date;
    status: string;

    constructor(machineIp: string, action: string, params: any, status: string){
        this.id = uuidv4();
        this.createdAt = new Date();
        this.machineIp = machineIp;
        this.action = action;
        this.params = params;
        this.status = status;
    }
}