import { Request, Response, ErrorRequestHandler } from 'express';

export interface ICustomRequest extends Request {
    [key: string]: any
}

export interface ICustomResponse extends Response {
    [key: string]: any
}

export interface ICustomError extends Error {
    statusCode: number;
    status: string;
    name: string,
    code: number
}