import { Request, Response } from "express";
import { User } from "../database/models/User";
import { UserRepository } from "../database/repositories/UserRepository";
import { Encrypt } from "../shared/helpers/EncryptHelper";
import { JwtHelper } from "../shared/helpers/JwtHelper";

export class AuthController{
    
    async login(req: Request, res: Response){
        const { login, password } = req.body;

        if(!login || !password) return res.status(400).json({ message: 'The login, password property can´t be null!'});

        try{
            const user : User | null = await UserRepository.findOne({
                where: {
                    email: login
                },
                relations:{
                    role: true
                }
            });

            if(!user) return res.status(401).json({message: "User not found!"});

            const verify = await new Encrypt().verifyHash(password, user.password);
            if(verify){
                return res.status(201).json({ token: JwtHelper.sing({ uid: user.id, role: user.role.role}) });
            }
            return res.status(400).json({ message: "Login or Password invalid!" });
            
        }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }
}