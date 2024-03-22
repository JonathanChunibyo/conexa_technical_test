import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthenticationCodeDto } from './create-authentication-code.dto';

export class UpdateAuthenticationCodeDto extends PartialType(CreateAuthenticationCodeDto) {}
