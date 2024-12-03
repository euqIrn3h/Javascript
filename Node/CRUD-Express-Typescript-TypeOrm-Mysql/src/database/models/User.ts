import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({name: 'role_id'})
    role: Role;
}