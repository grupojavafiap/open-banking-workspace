import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity("consent")
export class Consent
{
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    clientName!:string;

    @Column()
    consentId!:string;

    @Column()
    clientId!:string;

    @Column()
    businessId!:string;

    @Column()
    created!:Date;

    @Column()
    update!:Date;

    @Column()
    expire!:Date;

    @Column() // Dominio ConsentStatus
    status!:string;

    @OneToMany(() => Permission, permission => permission.consent, {cascade: ['insert', 'update']})
    permissions!:Array<Permission>;

}