import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { StarwarsService } from 'src/common/service/starwars.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PublicController],
  imports: [HttpModule],
  providers: [PublicService, StarwarsService],
})
export class PublicModule {}
