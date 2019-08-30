import {
    Column,
    Entity,
    BaseEntity,
    ObjectID,
    ObjectIdColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert
} from "typeorm";
import { AddressEntity } from "./address.entity";
import { sign } from "jsonwebtoken";
import { config } from "@commerce/shared";
import { hash } from "bcryptjs";
@Entity("users")
export class UserEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    @Column()
    seller: boolean;

    @Column("string")
    name: string;
    @Column("string", { unique: true })
    email: string;
    @Column("string")
    password: string;

    @CreateDateColumn({ type: "timestamp", default: Date.now() })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: Date.now() })
    updated_at: Date;

    @OneToOne(() => AddressEntity, address => address.user)
    address: AddressEntity;
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 12);
    }
    private get token() {
        const { id } = this;
        return sign({ id }, config.JWT_TOKEN, {
            expiresIn: config.JWT_TOKEN_EXPIRATION
        });
    }
    toResponseObject(showToken: boolean = true) {
        const {
            id,
            created_at,
            name,
            email,
            token,
            updated_at,
            seller,
            address
        } = this;
        let responseObject: any = {
            id,
            name,
            email,
            created_at,
            updated_at,
            seller
        };
        if (address) {
            responseObject.address = address;
        }
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }
}
