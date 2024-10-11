import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.authenticateUser(username, password);
  }

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.createUser(username, password);
  }
}     