import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../jwt/jwt.auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', description: 'Nome de usuário' },
        password: { type: 'string', description: 'Senha do usuário' },
      },
      required: ['username', 'password'],
    },
  })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.authenticateUser(username, password);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Nome do usuário' },
        username: { type: 'string', description: 'Nome de usuário' },
        password: { type: 'string', description: 'Senha do usuário' },
      },
      required: ['name', 'username', 'password'],
    },
  })
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string
  ) {
    return this.authService.createUser(name, username, password);
  }
}
