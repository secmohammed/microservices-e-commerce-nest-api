import {
    Column,
    Entity,
    BaseEntity,
    ObjectID,
    ObjectIdColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("products")
export class ProductEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    price: number;
    @ObjectIdColumn()
    user_id: ObjectID;

    @Column("string", { unique: true })
    title: string;
    @Column("string")
    description: string;

    @Column("string")
    image: string;

    @CreateDateColumn({ type: "timestamp", default: Date.now() })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp", default: Date.now() })
    updated_at: Date;

    toResponseObject() {
        return this;
    }
}
