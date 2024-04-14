import * as express from "express";
import {authController} from "./application.configuration";
import {authRequired} from "./middlewares/auth.middleware";
import {RoleEnum} from "./role";

export class AuthRoute {
    static async getRoutes() {
        const router = express.Router();

        router.get("/auth/login", authRequired(), await authController.login());
        router.post("/auth/sign-up", await authController.signUp());
        router.get("/auth/reset-password", await authController.resetPassword());
        router.get("/auth/admin", authRequired([RoleEnum.ADMIN]), await authController.admin());

        return router;
    }
}