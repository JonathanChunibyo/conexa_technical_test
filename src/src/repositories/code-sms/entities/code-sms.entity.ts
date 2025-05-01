// Libraries
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// Entities
import { BaseEntity } from "../../../common/entities/base.entity";

import { UserEntity } from "../../../repositories/user/entities/user.entity";

@Entity()
export class CodeSmsEntity extends BaseEntity {
  @Column("text")
  code: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  userId: string;
}
