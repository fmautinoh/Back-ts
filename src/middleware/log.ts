import { NextFunction, Request, Response } from "express";

const logMiddleware = (req:Request, res: Response, next: NextFunction) =>{
    console.log("--------------Logs Server-------------")
    const header = req.headers;
    const UserAgent = header["user-agent"]
    console.log(UserAgent);
    next();
}

export {logMiddleware};