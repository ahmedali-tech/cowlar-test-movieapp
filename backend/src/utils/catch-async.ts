import { NextFunction } from "express";
import { ICustomRequest, ICustomResponse } from '../types/express';


const catchAsync = (
    fn: (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => any
): ((req: ICustomRequest, res: ICustomResponse, next: NextFunction) => any) => {
    return (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export { catchAsync };