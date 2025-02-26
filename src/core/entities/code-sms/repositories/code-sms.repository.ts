import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../common/repositories/base.repository";
import { DataSource } from "typeorm";
import { CodeSmsDto, CodeSmsGetDto, CodeSmsUpdateDto } from "../dto/code-sms.dto";
import { CodeSmsEntity } from "../entities/code-sms.entity";

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
