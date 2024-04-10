import * as express from "express";
import {authController} from "./application.configuration";
import {getToken} from "./middlewares/auth.middleware";

export class AuthRoute {
    static async getRoutes() {
        const router = express.Router();

        router.get("/login", getToken(), await authController.login());
        router.get("/signUp", await authController.signUp());
        // router.get("/admin", getToken(), await authController.login());

        return router;
    }
}