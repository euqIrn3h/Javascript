import { Column, Entity, OneToMany, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('Roles')
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({length:20})
    role: string;
    @OneToMany(() => User, user => user.role)
    users: Array<User>;
}