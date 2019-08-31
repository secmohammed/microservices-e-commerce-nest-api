import {
    Column,
    Entity,
    BaseEntity,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("addresses")
export class AddressEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    address_1: string;
    @Column("text", { nullable: true })
    address_2: string;
    @Column("text")
    city: string;
    @Column("text")
    state: string;
    @Column("text")
    country: string;
    @Column("integer")
    zip: number;
    @OneToOne(() => UserEntity, user => user.address)
    @JoinColumn()
    user: UserEntity;
}
