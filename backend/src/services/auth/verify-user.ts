import { NextFunction } from "express";
import UserModel from "../../models/user";
import { ICustomRequest } from "../../types/express";
import { extractUserFromReq } from "../../utils/jwt";
import { AppError } from "../../utils/app-error";


const verifyUser = async (req: ICustomRequest, next: NextFunction) => {
    
    const userId = await extractUserFromReq(req, next);
    if (!userId) { return next(new AppError("Token was not provided", 403)) }

    const user = await UserModel.findById(userId);

    return user;
}

export default verifyUser