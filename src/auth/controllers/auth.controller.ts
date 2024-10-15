import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
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


  @Post('register')
  async register(@Body('name') name: string, @Body('username') username: string, @Body('password') password: string) {
    return this.authService.createUser(name, username, password);
  }
}     
