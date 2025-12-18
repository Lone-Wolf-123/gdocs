import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../docs/docs.entity';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Document])],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
