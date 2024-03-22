import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/models/users/entities/user.entity";

@Entity()

export class AuthenticationCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    code: string;

    @ManyToOne(
        () => User,
        (user) => user.codes
    )
    user: User;

}
