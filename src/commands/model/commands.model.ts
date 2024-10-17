import { v4 as uuidv4 } from 'uuid'
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class Command {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty({ message: 'Machine ID must not be empty' })
    machine_id: string;

    @IsString()
    @IsNotEmpty({ message: 'Action must not be empty' })
    action: string;

    constructor(machine_id: string, action: string){
        this.id = uuidv4();
        this.machine_id = machine_id;
        this.action = action;
    }
}