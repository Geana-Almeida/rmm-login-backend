import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MachineService } from '../service/machine.service';
import { agent } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Machines')
@ApiBearerAuth()
@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obter todas as máquinas' })
  async getMachines(): Promise<agent[]> {
    return this.machineService.getAllMachines();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/active')
  @ApiOperation({ summary: 'Obter máquinas ativas' })
  async getActiveMachines(): Promise<agent[]> {
    return this.machineService.getActiveMachines();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiOperation({ summary: 'Obter uma máquina específica pelo ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID da máquina' })
  async getMachine(@Param('id') id: string): Promise<agent> {
    return this.machineService.getMachineById(id);
  }
}
