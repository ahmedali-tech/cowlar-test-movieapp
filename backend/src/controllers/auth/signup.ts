import { ICustomRequest, ICustomResponse } from "../../types/express";
import UserModel from "../../models/user";
import { catchAsync } from "../../utils/catch-async";
import { signUpService } from "../../services/auth";

const signUpController = catchAsync(async (req: ICustomRequest, res: ICustomResponse) => {
    const { name, password, email, phoneNumber } = req.body;

    const newUser = await signUpService(name, password, email, phoneNumber);

    return res.status(200).json({
        message: "success",
        data: newUser
    })


});

export default signUpController;


