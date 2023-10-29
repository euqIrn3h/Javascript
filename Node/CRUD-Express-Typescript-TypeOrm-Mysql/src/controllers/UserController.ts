import { Request, Response } from "express";
import { RoleRepository } from "../database/repositories/RoleRepository";
import { UserRepository } from "../database/repositories/UserRepository";
import { Encrypt } from "../shared/helpers/EncryptHelper";

export class UserController{
    async create(req: Request, res: Response){
        const { name, email, role_id, password } = req.body;

        if(!name || !email || !role_id || !password ) return res.status(400).json({ message: 'The propertys can´t be null!'});

        try{
            const role = await RoleRepository.findOneBy({ id: role_id});
            if(!role) return res.status(401).json({ message: "role not found !"});

            const hashedPassword = await new Encrypt().getHash(password);
            const newRoom = UserRepository.create({
                name,
                email,
                password: hashedPassword,
                role
            });
            await UserRepository.save(newRoom);
            return res.status(201).json(newRoom);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }

    async getUsers(req: Request, res: Response){
        try{
            const users = await UserRepository.find({
                relations:{
                    role: true
                }
            });
            res.status(200).json(users);
        }
        catch(error){
            return res.status(500).json({ message: error});
        }
    }
}