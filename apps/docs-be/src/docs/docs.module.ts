import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity.js';
import { DocsController } from './docs.controller';
import { Document } from './docs.entity.js';
import { DocsGateway } from './docs.gateway.js';
import { DocsService } from './docs.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User, Document])],
  controllers: [DocsController],
  providers: [DocsService, DocsGateway],
  exports: [DocsService],
})
export class DocsModule {}
