import { ICustomRequest, ICustomResponse } from "../../types/express";
import { catchAsync } from "../../utils/catch-async";
import { signUpService } from "../../services/auth";
import { NextFunction } from "express";
import { AppError } from "../../utils/app-error";
import { generateJWT } from "../../utils/jwt";

const signUpController = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {
    const { name, password, email, phoneNumber } = req.body;

    const newUser = await signUpService(name, password, email, phoneNumber);
    if (!newUser) return next(new AppError("Error signing up! Pleae try again", 403));

    const jwtToken = generateJWT(newUser._id, next);

    return res.status(200).json({
        message: "success",
        token: jwtToken,
        data: {
            name: newUser?.name,
            email: newUser?.email,
            id: newUser?._id
        }
    })
});

export default signUpController;


