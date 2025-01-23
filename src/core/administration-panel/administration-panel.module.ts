import { Module } from '@nestjs/common';
import { AdministrationPanelService } from './administration-panel.service';
import { AdministrationPanelController } from './administration-panel.controller';
import { UserRepository } from 'src/database/user/user.repository';

@Module({
  controllers: [AdministrationPanelController],
  providers: [AdministrationPanelService, UserRepository],
})
export class AdministrationPanelModule {}
