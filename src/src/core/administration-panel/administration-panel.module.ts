// libraries
import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

// controller
import { AdministrationPanelController } from "./administration-panel.controller";

// services
import { AdministrationPanelService } from "./administration-panel.service";
import { ArgonService } from "../../common/service/argon2.service";
import { Base64Service } from "../../common/service/base64.service";
import { StarwarsService } from "src/common/service/starwars.service";

// repositories
import { UserRepository } from "../../repositories/user/repositories/user.repository";

@Module({
  controllers: [AdministrationPanelController],
  imports: [HttpModule],
  providers: [
    AdministrationPanelService,
    UserRepository,
    ArgonService,
    Base64Service,
    StarwarsService
  ],
})
export class AdministrationPanelModule {}
