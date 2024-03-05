import { NextFunction } from "express";
import { loginService } from "../../services/auth";
import { ICustomRequest, ICustomResponse } from "../../types/express";
import { AppError } from "../../utils/app-error";
import { catchAsync } from "../../utils/catch-async";
import { generateJWT } from "../../utils/jwt";

const logInController = catchAsync(async (req: ICustomRequest, res: ICustomResponse, next: NextFunction) => {
    const { password, email } = req.body;

    const user = await loginService(email, password);

    console.log(user);

    if (!user) {
        return next(new AppError("Wrong credentials", 401));
    }
    const jwtToken = generateJWT(user.id, next)

    return res.status(200).json({
        message: "success",
        token: jwtToken,
        data: user
    });
});

export default logInController;


