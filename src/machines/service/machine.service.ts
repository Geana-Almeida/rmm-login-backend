import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service/prisma.service";
import { agent } from "@prisma/client";

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}

  async getAllMachines(): Promise<agent[]> {
    try {
        return await this.prisma.agent.findMany();
    } catch (e) {
        throw new Error(`Failed to retrieve machines: ${e.message}`);
    }
  }

  async getMachineById(id: string): Promise<agent> {
    try {
        return await this.prisma.agent.findUnique({
            where: { id }
        });
    } catch (e) {
        throw new Error(`Failed to retrieve machine: ${e.message}`);
    }
  }
}
