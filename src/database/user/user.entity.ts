// Libraries
import { Column, Entity } from "typeorm";
import { BaseEntity } from '../../common/entities/base.entity'

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
