import { Module } from "@nestjs/common";
import { DocsController } from "./docs.controller.js";
import { DocsGateway } from "./docs.gateway.js";
import { DocsService } from "./docs.service.js";

@Module({
  controllers: [DocsController],
  providers: [DocsService, DocsGateway],
  exports: [DocsService],
})
export class DocsModule {}
