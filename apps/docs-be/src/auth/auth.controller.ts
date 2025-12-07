import { LoginDTO } from '@gdocs/shared/auth/login.js';
import { AuthResponseDTO, RegisterDTO } from '@gdocs/shared/auth/register.js';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO): Promise<AuthResponseDTO> {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDTO): Promise<AuthResponseDTO> {
    return this.auth.login(dto.email, dto.password);
  }
}
