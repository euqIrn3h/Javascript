import { sign, verify } from "jsonwebtoken";


interface IJwtData{
    uid: string,
    role: string
}

export class JwtHelper{

    static sing(data: IJwtData){
        try{
            return sign(data, process.env.JWT_SECRET as string, { expiresIn: '1h'});
        }    
        catch(error){
            console.log(error);
        }
    }

    static verify(token: string): IJwtData | string{
        try{
            const decoded = verify(token, process.env.JWT_SECRET as string);
            if(typeof(decoded) === 'string') return 'INVALID_TOKEN';

            return decoded as IJwtData;
        }
        catch(error){   
            return `Erro on parsing token ${error}`;
        }
    }
}