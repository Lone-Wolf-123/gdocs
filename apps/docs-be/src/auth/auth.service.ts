import { AuthResponseDTO, RegisterDTO } from '@gdocs/shared/auth/register.js';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from "bcrypt";
import { UserDTO } from '@gdocs/shared/user.js';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const existing = await this.users.findByEmail(data.email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    // here sending hashed password to user.service.ts which is not good design but for now I'm keeping it
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.users.createUser({
      ...data,
      password: hashed,
    });
    return this.createToken(user);
  }

  async login(email: string, rawPassword: string): Promise<AuthResponseDTO> {
    const user = await this.users.getPasswordByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(rawPassword, user.password);
    if (!valid) throw new UnauthorizedException();

    return this.createToken(user);
  }

  createToken(user: UserDTO): AuthResponseDTO {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwt.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
