import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({
            'name': name, 
            'email': email,
            'password': bcrypt.hashSync(password, 10)
        });

        res.status(201).json({
            'message': 'User registered successfully'
        });
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error en servidor'
            });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const {name, password} = req.body;
    try{
        const user: User|null = await User.findOne({
            where: {
                'name': name
            },
        });

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if(!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({
                message: 'Incorrect password'
            });
        }

        //We create new user without pwd to avoid sending password
        const {password: pwd, ...userWithoutPwd} = user.get({plain: true});

        const token = jwt.sign({'id': user.id}, process.env.SECRET_KEY!, {
            'algorithm': 'HS256',
            'expiresIn': 24*60*60,
            'allowInsecureKeySizes': true
        });

        req.session!.token = token;

        res.status(200).json(userWithoutPwd);
    }catch(error: unknown){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error logging in'
            });
        }
    }
}

export const refreshSession = (req: Request, res: Response) => {
    return res.status(200).json({'message': `Session active, user ${req.userId}`});
}

export const logout = (req: Request, res: Response) => {
    try{
        req.session = null;
        return res.status(200).json({
            message: 'Logged out successfully'
        });
    }catch(error){
        if(error instanceof Error){
            console.log(error.stack);
            res.status(500).json({
                'message': error.message
            });
        }else{
            console.log(error);
            res.status(500).json({
                'message':'Error logging out'
            });
        }
    }
}