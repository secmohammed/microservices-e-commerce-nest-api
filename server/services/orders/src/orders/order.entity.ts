import {
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    Entity,
    BaseEntity,
    ObjectID,
    ObjectIdColumn
} from "typeorm";

@Entity("orders")
export class OrderEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    @ObjectIdColumn()
    user_id: ObjectID;

    @Column("number", { default: 0 })
    totalPrice: number;

    @Column("simple-json", { array: true })
    products: {
        id: ObjectID;
        quantity: number;
    }[];

    @CreateDateColumn({ type: "timestamp", default: Date.now() })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: Date.now() })
    updated_at: Date;
}
