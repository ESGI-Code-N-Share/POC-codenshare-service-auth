import {Request, RequestHandler} from "express";
import {authService} from "../application.configuration";
import {RoleEnum} from "../role";

declare module 'express' {
    export interface Request {
        uid?: string;
    }
}

export function authRequired(roles?: [RoleEnum]): RequestHandler {
    return async (req: Request, res, next) => {
        try {

            const authorization = req.header("Authorization");
            if (!authorization) {
                return res.status(400).statusMessage = "Not authorize";
            }

            const split = authorization.split(" ");
            if (split.length !== 2 || split[0] !== 'Bearer' || !split[1]) {
                return res.status(400).statusMessage = "Invalid-authorization";
            }

            const token = split[1].trim();

            authService.checkToken(token)
                .then(async (decodedToken) => {
                    const uid = decodedToken.uid;
                    const user = await authService.getUser(uid);

                    if (!user) {
                        return res.status(400).statusMessage = "User not found";
                    }

                    if (roles && roles.length > 0) {
                        console.log("Check roles ....");
                        console.log(user.customClaims)
                    }

                    req.uid = user.uid;
                    next();


                })
                .catch((e) => {
                    console.log(e)
                    res.status(400).send({message: "Invalid Token"});
                })

        } catch (e) {
            console.error(e)
            res.status(500).send({message: "Server Error"});

        }

    }

}