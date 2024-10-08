import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.authenticateUser(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.createUser(username, password);
  }
}     
