import { RegisterDTO } from "@gdocs/shared/auth/register.js";
import { UserDTO } from "@gdocs/shared/user.js";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: any) {}

  async findByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async findById(id: string): Promise<UserDTO | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async createUser(data: RegisterDTO): Promise<UserDTO> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name ?? "",
        password: hashed,
      },
    });
    return plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
  }
}
