import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/models/users/entities/user.entity";

@Entity()

export class AuthenticationCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    code: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    userId: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
