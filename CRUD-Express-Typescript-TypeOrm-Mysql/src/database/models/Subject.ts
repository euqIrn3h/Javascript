import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('Subjects')
export class Subject{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text'})
    name: string;
    @ManyToMany(() => Room, room => room.subjects)
    @JoinTable({
        name: 'room_subject',
        joinColumn:{
            name: 'room_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id'
        }
    })
    rooms: Array<Room>;
}