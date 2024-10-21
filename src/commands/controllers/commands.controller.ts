import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandsService } from '../services/commands.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Command')
@Controller()
export class CommandsController {
  constructor(private readonly commandService: CommandsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-command')
  @ApiOperation({ summary: 'Enviar um comando para uma máquina' })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        machine_id: { type: 'string', description: 'ID da máquina alvo' },
        action: {
          type: 'string',
          description: 'Ação a ser executada pela máquina',
        },
      },
      required: ['machine_id', 'action'],
    },
  })
  async addCommand(
    @Body('machine_id') machineId: string,
    @Body('action') action: string,
  ) {
    return await this.commandService.addCommand(action, machineId);
  }

  //   @UseGuards(JwtAuthGuard)
  // @Get('get-response')
  // async getNextResponse() {
  //   return await this.commandService.getResponseCommand();
  // }
}
