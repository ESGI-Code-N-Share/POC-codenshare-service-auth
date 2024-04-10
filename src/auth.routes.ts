import * as express from "express";
import {authController} from "./application.configuration";
import {authRequired} from "./middlewares/auth.middleware";
import {RoleEnum} from "./role";

export class AuthRoute {
    static async getRoutes() {
        const router = express.Router();

        router.get("/login", authRequired(), await authController.login());
        router.get("/signUp", await authController.signUp());
        router.get("/admin", authRequired([RoleEnum.ADMIN]), await authController.admin());

        return router;
    }
}