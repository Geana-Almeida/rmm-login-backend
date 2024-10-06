import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule {}