import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity('Users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({length:50})
    name: string;
    @Column({length:100})
    email: string;
    @Column()
    password: string;
    @OneToOne(() => Role, role => role.user)
    @JoinColumn({name: 'role_id'})
    role: Role;
}