import {Request, RequestHandler, Response} from "express";
import {AuthService} from "./services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {
    }


    async login(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                res.status(200).send({message: "Vous êtes connecté"})
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
                    const userCreated = await this.authService.createUser(email, password);
                    await this.authService.setClaims(userCreated.uid);

                    const link = await this.authService.sendLinkForMailVerification(email);
                    res.status(201).statusMessage = "User created";
                    res.send({link: link}).end()

                } catch (e: any) {
                    res.status(400).send({message: e.code}).end()
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

    async resetPassword(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                if (typeof req.body["email"] != "string") {
                    return res.status(400).end();
                }

                const email = req.body["email"] as string;
                if (!email?.trim()) {
                    return res.status(400).end();
                }

                const link = await this.authService.sendMailForResetPassword(email);
                res.status(200).send({link: link})

            } catch (e: any) {
                console.log(`${e}`);
                res.status(500).statusMessage = "server_error";
                res.send().end();
            }
        }
    }
}