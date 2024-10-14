import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, CommandsModule, PrismaModule],
  providers: [],
})
export class AppModule {}
