// Libraries
import { 
    BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn 
} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    generateUUID() {
        this.id = uuidv4();
    }
}
