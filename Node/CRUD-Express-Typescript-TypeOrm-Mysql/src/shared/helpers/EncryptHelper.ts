import { compare, genSalt, hash } from "bcrypt";

export class Encrypt{

    async getHash(password: string){
        const salt = await genSalt(10);
        return await hash(password, salt);
    }

    async verifyHash(password: string, hash: string){
        return await compare(password, hash);
    }
}