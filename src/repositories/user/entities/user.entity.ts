// Libraries
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity{
    @Column('text')
    name: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
    })
    nickName: string

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
    })
    email: string

    @Column('text')
    password: string;

    @Column({
        type: 'boolean',
        default: true
    })
    isState: boolean;
}
