import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandsService } from '../services/commands.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';

@Controller()
export class CommandsController {
  constructor(private readonly commandService: CommandsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-command')
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
