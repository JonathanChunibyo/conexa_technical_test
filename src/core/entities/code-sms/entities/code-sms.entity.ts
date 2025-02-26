// Libraries
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// Entities
import { BaseEntity } from "src/common/entities/base.entity";
import { UserEntity } from "src/core/entities/user/entities/user.entity";

@Entity()
export class CodeSmsEntity extends BaseEntity{
  @Column("text")
  code: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "userId" })
  userId: string;
}
