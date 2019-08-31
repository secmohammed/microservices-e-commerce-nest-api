import {
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("orders")
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column("integer", { default: 0 })
    totalPrice: number;

    @Column({ type: "jsonb" })
    products: {
        id: string;
        quantity: number;
    }[];

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
