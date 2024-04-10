import {AuthService} from "./services/auth.service";

// service
import {AuthController} from "./auth.controller";

const authService: AuthService = new AuthService();

// controller
export const authController: AuthController = new AuthController(authService);