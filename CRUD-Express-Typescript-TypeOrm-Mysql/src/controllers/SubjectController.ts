import { Request, Response } from "express";
import { SubjectRepository } from "../database/repositories/SubjectRepository";

export class SubjectController{

    async create(req: Request, res: Response){
        const { name } = req.body;

        if(!name) return res.status(400).json({ message: 'The name property can´t be null!'});

        try{
            const newSubject = SubjectRepository.create({ name });
            await SubjectRepository.save(newSubject);
            return res.status(201).json(newSubject);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }
}