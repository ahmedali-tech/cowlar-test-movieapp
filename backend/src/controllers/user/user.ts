import { NextFunction } from "express";
import { ICustomRequest, ICustomResponse } from "../../types/express";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import { extractUserFromReq } from "../../utils/jwt";
import { deleteUser as deleteUserService } from "../../services/user";

const deleteUser = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {

    const userId = await extractUserFromReq(req, next);
    if (!userId) return next(new AppError('Invalid access token', 401))

    const deletedUser = await deleteUserService(userId);

    if (!deletedUser) {
        return res.status(404).json({
            message: "fail",
            data: "No such user found"
        });
    }

    return res.status(204).json({
        message: "success",
    });
});

export { deleteUser }