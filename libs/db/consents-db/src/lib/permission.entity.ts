import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consent } from "./consent.entity";
import { PermissionType } from "./permission-type.entity";

@Entity("permission")
export class Permission
{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => PermissionType, {eager: true})
    type!:PermissionType;

    @ManyToOne(type => Consent)
    consent!:Consent;
}