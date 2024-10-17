import { Module } from '@nestjs/common';
import { CommandsService } from './services/commands.service';
import { CommandsController } from './controllers/commands.controller'; 
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    AuthModule,
  ], 
  providers: [CommandsService],
  controllers: [CommandsController],
})
export class CommandsModule {}
