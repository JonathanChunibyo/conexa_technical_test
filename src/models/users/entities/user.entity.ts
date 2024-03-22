import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
    })
    nickName: string

    @Column('text')
    password: string;

    @Column('boolean')
    isState: boolean;
}
