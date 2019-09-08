import {
    Column,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity("payments")
export class PaymentEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @PrimaryGeneratedColumn("uuid")
    user_id: string;
    @Column("text", { nullable: true })
    brand: string;
    @Column("text", { nullable: true })
    last_four: string;
    @Column("boolean", { default: true })
    default: boolean;
    @Column("text", { unique: true })
    provider_id: string;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
