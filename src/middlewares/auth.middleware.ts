import {Request, RequestHandler} from "express";

declare module 'express' {
    export interface Request {
        token?: string;
    }
}

export function getToken(): RequestHandler {
    return async (req: Request, res, next) => {
        try {

            const authorization = req.header("Authorization");
            if (!authorization) {
                res.statusMessage = "Not authorize"
                console.log(res.statusMessage);
                return res.status(400).statusMessage;
            }

            const split = authorization.split(" ");
            if (split.length !== 2 || split[0] !== 'Bearer' || !split[1]) {
                res.statusMessage = "Invalid-authorization"
                console.log(res.statusMessage);
                return res.status(400).statusMessage;
            }

            const token = split[1].trim();
            console.log(token)


            req.token = token;
            next();

        } catch (e) {
            console.error(e)
            next();
        }

    }

}