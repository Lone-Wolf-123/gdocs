import { RegisterDTO } from '@gdocs/shared/auth/register.js';
import { UserDTO } from '@gdocs/shared/user.js';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.repo.findOne({
      where: { email },
    });
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async getPasswordByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.repo.findOne({
      where: { email },
    });
    return plainToInstance(UserDTO, user);
  }

  async findById(id: string): Promise<UserDTO | null> {
    const user = await this.repo.findOne({
      where: { id },
    });
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(data: RegisterDTO): Promise<UserDTO> {
    const user = this.repo.create(data);
    const res = await this.repo.save(user);

    return plainToInstance(UserDTO, res, {
      excludeExtraneousValues: true,
    });
  }
}
