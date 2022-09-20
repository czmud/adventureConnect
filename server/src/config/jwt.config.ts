import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import 'dotenv/config';

export const authenticate = (req: Request, res: Response, next: NextFunction  ) => {
    jwt.verify(req.cookies.organizerToken, process.env.SECRET_KEY!, {}, (err , payload) => {
        if (err) {
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}