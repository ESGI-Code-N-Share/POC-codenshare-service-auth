import {Request, RequestHandler, Response} from "express";
import {AuthService} from "./services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {
    }


    async login(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                console.log(req.uid!)
                res.status(200).send({id: req.uid})

            } catch (e: any) {
                console.log(`${e}`);
                res.status(500).statusMessage = "server_error";
                res.send().end();
            }
        }
    }

    async signUp(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                if (typeof req.body["email"] != "string" || typeof req.body["password"] != "string") {
                    return res.status(400).end();
                }

                const {email, password} = req.body as { email: string, password: string };
                if (!email?.trim() || !password?.trim()) {
                    return res.status(400).end();
                }

                try {
                    await this.authService.createUser(email, password);
                    res.status(201).statusMessage = "User inscrit";
                    res.send().end()

                } catch (e: any) {
                    res.status(400).send({message: e.message}).end()
                }


            } catch (e: any) {
                res.status(400).end();
            }
        }
    }

    async admin(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {

                try {
                    await this.authService.admin();
                    res.status(200).send({message: "Vous êtes un admin !!"}).end()

                } catch (e: any) {
                    res.status(400).send({message: e.message}).end()
                }


            } catch (e: any) {
                res.status(400).end();
            }
        }
    }
}