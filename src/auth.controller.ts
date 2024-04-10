import {RequestHandler} from "express";
import {AuthService} from "./services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {
    }


    async login(): Promise<RequestHandler> {
        return async (req, res) => {
            if (typeof req.body["mail"] != "string" || typeof req.body["password"] != "string") {
                // return res.status(400).end();
            }

            // const {mail, password} = req.body as {mail: string, password: string};
            // if(!mail?.trim() || !password?.trim()) {
            //     return res.status(400).end();
            // }

            await this.authService.login();
            res.status(200).send();

        }
    }
}