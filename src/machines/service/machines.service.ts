import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Machines } from "../model/machines.model"

@Injectable()
export class MachinesService{
    constructor(
        @InjectRepository(Machines)
        private readonly machinesRepository: Repository<Machines>
    ){}

    async getMachineIp(machineId: string): Promise<string> {
        
        const machine = await this.machinesRepository.findOne({
            where: {id: machineId}
        });

        if(!machine){
            throw new Error(`Machine with ID ${machineId} not found`);
        }

        return machine.ipAddress;
    }
}