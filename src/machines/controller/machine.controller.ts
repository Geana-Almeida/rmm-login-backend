import { Controller, Get, Param } from '@nestjs/common';
import { MachineService } from '../service/machine.service';
import { agent } from '@prisma/client';

@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Get()
  async getMachines(): Promise<agent[]> {
    return this.machineService.getAllMachines();
  }

  @Get("/active")
  async getActiveMachines(): Promise<agent[]> {
    return this.machineService.getActiveMachines();
  }

  @Get("/:id")
  async getMachine(@Param('id') id: string): Promise<agent> {
    return this.machineService.getMachineById(id);
  }
}