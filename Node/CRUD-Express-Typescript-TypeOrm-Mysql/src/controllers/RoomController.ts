import { Request, Response } from "express";
import { RoomRepository } from "../database/repositories/RoomRepository";
import { SubjectRepository } from "../database/repositories/SubjectRepository";
import { VideoRepository } from "../database/repositories/VideoRepository";

export class RoomController{

    async create(req: Request, res: Response){
        const { name } = req.body;

        if(!name) return res.status(400).json({ message: 'The name property can´t be null!'});

        try{
            const newRoom = RoomRepository.create({ name });
            await RoomRepository.save(newRoom);
            return res.status(201).json(newRoom);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }

    async createVideo(req: Request, res: Response){
        const { title, url,  description } = req.body;
        const { room_id } = req.params;

        if(!title || !url) return res.status(400).json({ message: 'The object propertys can´t be null!'});

        try{
            const room = await RoomRepository.findOneBy({ id: room_id});

            if(!room) return res.status(401).json({ message: "Room not found !"});

            const newVideo = VideoRepository.create({
                title,
                url,
                description,
                room
            });

            await VideoRepository.save(newVideo);
            return res.status(201).json(newVideo);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }

    async addSubject(req: Request, res: Response){
        const { subject_id } = req.body;
        const { room_id } = req.params;

        if(!subject_id || !room_id) return res.status(400).json({ message: 'The object propertys can´t be null!'});

        try{
            const room = await RoomRepository.findOneBy({ id: room_id});

            if(!room) return res.status(401).json({ message: "Room not found !"});

            const subject = await SubjectRepository.findOneBy({ id: subject_id});

            if(!subject) return res.status(401).json({ message: "Subject not found !"});
            
            const roomUpdate = {
                ...room,
                subjects: [subject]
            };

            await RoomRepository.save(roomUpdate);
            return res.status(201).json(roomUpdate);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }

    async list(req: Request, res: Response){
        try{
            const rooms = await RoomRepository.find({
                relations:{
                    subjects: true,
                    videos: true
                }
            });
            res.status(200).json(rooms);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }
}