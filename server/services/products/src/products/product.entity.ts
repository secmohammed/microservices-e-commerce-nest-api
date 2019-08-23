import { ObjectType, Field, ID } from "type-graphql";
import { Column, Entity, BaseEntity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("products")
@ObjectType()
export class ProductEntity extends BaseEntity {
    @ObjectIdColumn()
    @Field(() => ID)
    id: ObjectID;

    @Field(() => String)
    @Column("string", { unique: true })
    name: string;

    @Field(() => Number)
    @Column()
    price: number;
}
