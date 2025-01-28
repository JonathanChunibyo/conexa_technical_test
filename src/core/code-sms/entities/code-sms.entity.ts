// Libraries
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

// Entities
import { UserEntity } from "src/core/user/entities/user.entity";

@Entity()

export class CodeSmsEntity {
    @Column('text')
    code: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    userId: UserEntity;
}
