// libraries
import { Module } from "@nestjs/common";

// controller
import { AdministrationPanelController } from "./administration-panel.controller";

// services
import { AdministrationPanelService } from "./administration-panel.service";
import { ArgonService } from "src/common/service/argon2.service";

// repositories
import { UserRepository } from "../../repositories/user/repositories/user.repository";

@Module({
  controllers: [AdministrationPanelController],
  providers: [AdministrationPanelService, UserRepository, ArgonService],
})
export class AdministrationPanelModule {}
