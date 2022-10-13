import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { env } from "../util/environment"

export const authenticate = (req: Request, res: Response, next: NextFunction  ) => {
    jwt.verify(req.cookies.organizerToken, env.SECRET_KEY, {}, (err , payload) => {
        if (err) {
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}