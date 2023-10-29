import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('Videos')
export class Video{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({length:100})
    title: string;
    @Column({type: 'text'})
    url: string;
    @Column({type: 'text', nullable: true})
    description: string;
    @ManyToOne(() => Room, room => room.videos)
    @JoinColumn({name: 'room_id'})
    room: Room;
}