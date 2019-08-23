import { Column, Entity, BaseEntity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity("users")
export class UserEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column("string", { unique: true })
    username: string;
}
