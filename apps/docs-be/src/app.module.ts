import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { typeormConfig } from './database/typeorm.config.js';
import { DocsModule } from './docs/docs.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: "sqlite",
    //   database: ":memory:", // or "db.sqlite"
    //   synchronize: true,
    //   entities: [__dirname + "/**/*.entity{.ts,.js}"],
    // }),
    TypeOrmModule.forRoot(typeormConfig),
    DocsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
