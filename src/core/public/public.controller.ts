import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PublicService } from "./public.service";
import { CreatePublicDto } from "./dto/create-public.dto";

// decorator
import { ApiSwaggerResponse } from "../../infrastructure/documentation/decorators/swagger-decorator";

// guards
import { AuthGuard } from "@nestjs/passport";

// documentation
import { readApiValidateField } from "../../infrastructure/documentation/command/swagger.command";
import { StarwarsService } from "../../common/service/starwars.service";

const controllerPath = "public";

@Controller("public")
export class PublicController {
  constructor(
    private readonly publicService: PublicService,
    private readonly starwarsService: StarwarsService
  ) {}

  @Get("list-movies")
  @ApiSwaggerResponse(readApiValidateField("list-movies", controllerPath))
  async listMovies() {
    const { results } = await this.starwarsService.getFilms();
    return results.map(
      ({ title, episode_id, opening_crawl, director, producer }) => ({
        title,
        episode_id,
        opening_crawl,
        director,
        producer,
      })
    );
  }
}
