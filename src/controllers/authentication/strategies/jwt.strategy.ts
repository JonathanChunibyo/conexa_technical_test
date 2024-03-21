import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/models/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import * as message from '../../../errors/messageGlobal.errors.json'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super({
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload;
        const user = await this.userRepository.findOneBy({ id });

        if (!user) throw new UnauthorizedException(message.tokenInvalid)

        if(!user.isState) throw new UnauthorizedException(message.userNotAuthorized)

        return user;

    }

}