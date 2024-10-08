import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	    useClass: ProdService,
      imports: [ConfigModule],
    }),
    AuthModule,
    CommandsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
