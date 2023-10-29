import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('Roles')
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({length:20})
    role: string;
    @OneToOne(() => User, user => user.role)
    user: User;
}