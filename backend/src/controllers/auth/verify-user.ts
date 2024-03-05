import { ICustomRequest, ICustomResponse } from "../../types/express";
import { catchAsync } from "../../utils/catch-async";
import { verifyUserService } from "../../services/auth";
import { NextFunction } from "express";
import { AppError } from "../../utils/app-error";
import { generateJWT } from "../../utils/jwt";

const verifyUserController = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const user = await verifyUserService(req, next);
    if (!user) return next(new AppError("Access token is not valid.", 403));

    return res.status(200).json({
        message: "success",
        data: {
            name: user?.name,
            email: user?.email,
            id: user?._id
        }
    })
});

export default verifyUserController;


