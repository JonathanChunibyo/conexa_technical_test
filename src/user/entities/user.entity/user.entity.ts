// Libraries
import { Column } from "typeorm";
import { BaseEntity } from '../../../common/entities/base.entity'

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

    @Column('boolean')
    isState: boolean;
}
