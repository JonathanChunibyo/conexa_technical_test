import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthenticationCode } from "src/models/authentication-code/entities/authentication-code.entity";

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

    @OneToMany(
        () => AuthenticationCode, 
        (authCode) => authCode.user,
        { cascade: true }
        )
    codes?: AuthenticationCode[];
}
