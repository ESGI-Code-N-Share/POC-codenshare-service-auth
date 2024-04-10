import * as express from "express";
import {authController} from "./application.configuration";

export class AuthRoute {
    static async getRoutes() {
        const router = express.Router();

        router.get("/login", await authController.login());

        return router;
    }
}