import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';
import { PrismaModule } from '../prisma/prisma.module';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [AuthModule, PrismaModule, MachinesModule, CommandsModule],
  providers: [],
})
export class AppModule {}
