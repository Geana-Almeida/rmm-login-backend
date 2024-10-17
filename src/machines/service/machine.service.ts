import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/service/prisma.service";
import { Agent } from "@prisma/client";

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}

  async getAllMachines(): Promise<Agent[]> {
    try {
      return await this.prisma.agent.findMany();
    } catch (e) {
      throw new Error(`Failed to retrieve machines: ${e.message}`);
    }
  }

  async getActiveMachines(): Promise<Agent[]> {
    try {
      return await this.prisma.agent.findMany({
        where: {
          status: "ACTIVE"
        }
      });
    } catch (e) {
      throw new Error(`Failed to retrieve actives machines: ${e.message}`);
    }
  }

  async getMachineById(id: string): Promise<Agent> {
    try {
      return await this.prisma.agent.findUnique({
        where: { id }
      });
    } catch (e) {
      throw new Error(`Failed to retrieve machine: ${e.message}`);
    }
  }
}
