import {
    Column,
    Entity,
    BaseEntity,
    ObjectID,
    ObjectIdColumn,
    OneToOne
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

    @Column({ type: Date })
    created_at: Date;

    @OneToOne(() => AddressEntity, address => address.user)
    address: AddressEntity;
}
