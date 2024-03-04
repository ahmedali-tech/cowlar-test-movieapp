import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/app-error";
import { extractUserFromReq } from "../../utils/jwt";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {

    const userID = extractUserFromReq(req, next)

    if (userID) next();
    else return next(new AppError('Unauthorized access. Please log in.', 401))

};

export default isLoggedIn;