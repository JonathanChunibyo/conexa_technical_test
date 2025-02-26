import { Module } from "@nestjs/common";
import { AdministrationPanelService } from "./administration-panel.service";
import { AdministrationPanelController } from "./administration-panel.controller";
import { UserRepository } from "../entities/user/repositories/user.repository";
import { ArgonService } from "src/common/service/argon2.service";

@Module({
  controllers: [AdministrationPanelController],
  providers: [AdministrationPanelService, UserRepository, ArgonService],
})
export class AdministrationPanelModule {}
