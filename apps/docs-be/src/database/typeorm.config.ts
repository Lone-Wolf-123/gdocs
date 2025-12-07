// src/database/typeorm.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Document } from '../docs/docs.entity.js';
import { User } from '../users/user.entity.js';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "postgres",
  database: ':memory:', // or "db.sqlite"
  synchronize: true, // turn off in production
  logging: false,
  entities: [User, Document],
  // entities: [__dirname + "/**/*.entity{.ts,.js}"],
};
