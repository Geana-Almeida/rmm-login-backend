import { Module } from '@nestjs/common';
import { CommandsService } from './services/commands.service';
import { CommandsController } from './controllers/commands.controller'; 
import { AuthModule } from '../auth/auth.module'; // Importe o AuthModule para ter acesso à autenticação

@Module({
  imports: [AuthModule], // Importe o AuthModule para usar o JwtAuthGuard nas rotas
  providers: [CommandsService],
  controllers: [CommandsController],
})
export class CommandsModule {}



