// libraries
import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

// repositories
import { BaseRepository } from "../../../common/repositories/base.repository";
import { CodeSmsEntity } from "../entities/code-sms.entity";

// dto
import { CodeSmsDto, CodeSmsGetDto, CodeSmsUpdateDto } from "../dto/code-sms.dto";

@Injectable()
export class CodeSmsRepository extends BaseRepository<
  CodeSmsEntity,
  CodeSmsDto,
  CodeSmsUpdateDto,
  CodeSmsGetDto
> {
  constructor(dataSource: DataSource) {
    super(CodeSmsEntity, dataSource);
  }
}
