import { Injectable } from "@nestjs/common"
import { PrismaService } from "prisma/service/prisma.service";
import { Machine } from "@prisma/client";


@Injectable()
export class MachinesService{
    constructor(
        private prisma: PrismaService,
    ){}

    async getMachineIp(machineId: string): Promise<string> {

        const machine: Machine = await this.prisma.machine.findUnique({
            where: {id: machineId}
        });

        if(!machine){
            throw new Error(`Machine with ID ${machineId} not found`);
        }

        return machine.ipAddress;
    }
}