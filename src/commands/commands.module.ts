import { Module } from '@nestjs/common';
import { CommandsService } from './services/commands.service';
import { CommandsController } from './controllers/commands.controller'; 
import { AuthModule } from '../auth/auth.module'; 
import { MachinesService } from 'src/machines/service/machines.service';

@Module({
  imports: [
    AuthModule,
  ], 
  providers: [CommandsService, MachinesService],
  controllers: [CommandsController],
})
export class CommandsModule {}



