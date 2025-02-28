// Libraries
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as messageError from "../constants/strategies/jwt.json";
import { PassportStrategy } from "@nestjs/passport";

// Service
import { EnvironmentService } from "../service/environment.service";

// Repository
import { UserRepository } from "src/repositories/user/repositories/user.repository";
import { UserEntity } from "src/repositories/user/entities/user.entity";

export interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly environmentService: EnvironmentService
  ) {
    super({
      secretOrKey: environmentService.get("SECRET_KEY"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userRepository.findById({ id });

    if (!user) throw new UnauthorizedException(messageError.tokenInvalid);

    if (!user.isState)
      throw new UnauthorizedException(messageError.userNotAuthorized);

    return user;
  }
}
