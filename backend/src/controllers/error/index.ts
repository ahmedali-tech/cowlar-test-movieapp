import { ICustomError, ICustomResponse } from "../../types/express";
import { NextFunction } from "express";
import { AppError } from "../../utils/app-error";

const handleCastErr = (err: any): any => {
    return new AppError(`Incorrect ${err.path}: ${err.value}`, 400);
}
const handleValidationErr = (err: any): any => {
    // console.log(err.errors.message);
    // return new AppError(`${err.message}`, 400);
    const errors = Object.values(err.errors).map((el: any) => el.message);
    const message = `Invalid input. ${errors.join('. ')}`;
    return new AppError(message, 400);

}

const handleDuplicateKeyErr = (err: any): any => {
    const dupKey = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(`Duplicate field value: ${dupKey}. Use another value`, 400);
}

module.exports = (err: ICustomError, req: Request, res: ICustomResponse, next: NextFunction): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.name === "CastError") err = handleCastErr(err);
    if (err.name === "ValidationError") err = handleValidationErr(err);
    if (err.code === 11000) err = handleDuplicateKeyErr(err);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}
