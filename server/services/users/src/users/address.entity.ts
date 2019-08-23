import {
    Column,
    Entity,
    BaseEntity,
    ObjectIdColumn,
    ObjectID,
    OneToOne,
    JoinColumn
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("addresses")
export class AddressEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column("string")
    address_1: string;
    @Column("string", { nullable: true })
    address_2: string;
    @Column("string")
    city: string;
    @Column("string")
    state: string;
    @Column("string")
    country: string;
    @Column("number")
    zip: number;
    @OneToOne(() => UserEntity, user => user.address)
    @JoinColumn()
    user: UserEntity;
}
