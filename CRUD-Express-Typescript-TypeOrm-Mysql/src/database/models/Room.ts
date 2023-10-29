import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "./Subject";
import { Video } from "./Video";

@Entity('Rooms')
export class Room{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'text'})
    name: string;
    @OneToMany(() => Video,  video => video.room)
    videos: Array<Video>;
    @ManyToMany(() => Subject, subject => subject.rooms)
    subjects: Array<Subject>;
}