import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [AuthModule, CommandsModule],
  providers: [],
})
export class AppModule {}
