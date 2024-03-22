import { Controller, Post} from '@nestjs/common';
import { SeedersService } from './seeders.service';

@Controller('seeders')
export class SeedersController {
  constructor(
    private readonly seedersService: SeedersService
  ) { }

  @Post()
  async create() {
    try {
      await this.seedersService.postData();
      return true;
    } catch (error) {
      return error.response;
    }
  }
}
