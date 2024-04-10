import {Request, RequestHandler, Response} from "express";
import {AuthService} from "./services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {
    }


    async login(): Promise<RequestHandler> {
        return async (req: Request, res: Response) => {
            try {
                this.authService.checkToken(req.token!)
                    .then((decodedToken) => {
                        console.log(decodedToken.uid)
                        res.status(200).send({id: decodedToken.uid})
                    })
                    .catch((error) => {
                        res.statusMessage = "bad token";
                        res.status(400).send();
                    });
            } catch (e: any) {
                console.log(`${e}`);
                res.statusMessage = "server_error";
                res.status(500).send();
            }
        }
    }
}