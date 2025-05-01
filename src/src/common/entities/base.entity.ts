// Libraries
import { 
    BeforeInsert, CreateDateColumn, PrimaryColumn, UpdateDateColumn 
} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 36 })
    id: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: String;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: String;

    @BeforeInsert()
    generateUUID() {
        this.id = uuidv4();
    }
}
