import {
    Column,
    Entity,
    BaseEntity,
    ObjectID,
    ObjectIdColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    seller: boolean;

    @Column("string", { unique: true })
    name: string;
    @Column("string")
    password: string;

    @CreateDateColumn({ type: "timestamp", default: Date.now() })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: Date.now() })
    updated_at: Date;

    @OneToOne(() => AddressEntity, address => address.user)
    address: AddressEntity;
}
