import { Column, Entity } from "typeorm";

@Entity("permission-type")
export class PermissionType
{
    @Column({primary: true })
    id!: string;

    @Column()
    description!:string;
}


