import { Module } from '@nestjs/common';
import { CommandsService } from './services/commands.service';
import { CommandsController } from './controllers/commands.controller'; 
import { AuthModule } from '../auth/auth.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commands } from './models/command.model';
import { Machines } from 'src/machines/model/machines.model';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Commands, Machines]),
  ], 
  providers: [CommandsService],
  controllers: [CommandsController],
})
export class CommandsModule {}



