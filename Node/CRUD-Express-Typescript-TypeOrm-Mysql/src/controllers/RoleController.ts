import { Request, Response } from "express";
import { RoleRepository } from "../database/repositories/RoleRepository";

export class RoleController{

    async create(req: Request, res: Response){
        const { role } = req.body;

        if(!role) return res.status(400).json({ message: 'The role property can´t be null!'});

        try{
            const newRole = RoleRepository.create({ role });
            await RoleRepository.save(newRole);
            return res.status(201).json(newRole);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }
}