import { Expose, Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @Expose() @IsEmail() email!: string;
  @Expose() @MinLength(6) @IsString() password!: string;
  @Expose() @IsOptional() @IsString() name?: string;
}

export class AuthUserDataDTO {
  @Expose()
  id!: string;
  @Expose()
  email!: string;
  @Expose()
  name?: string;
}

export class AuthResponseDTO {
  @Expose()
  access_token!: string;

  @Expose()
  @Type(() => AuthUserDataDTO)
  user!: AuthUserDataDTO;
}
