import {Auth} from "firebase-admin/auth";
import {getFirebase} from "./firebase.service";
import {RoleEnum} from "../role";


export class AuthService {
    auth: Auth

    constructor() {
        if (getFirebase) { // fixme
            this.auth = getFirebase.auth;
        }
    }

    async checkToken(token: string) {
        return this.auth.verifyIdToken(token);
    }

    async setClaims(uuid: string) {
        await this.auth.setCustomUserClaims(uuid, {
            roles: [RoleEnum.USER]
        })
    }

    async admin() {
        console.log("Autorisé")
    }

    async getUser(uid: string) {
        return this.auth.getUser(uid);
    }


    async createUser(email: string, password: string) {
        console.log("Create User...");

        if (!email.trim() || !password.trim()) {
            throw new Error("auth/empty-fields");
        }

        return this.auth.createUser({
            email: email,
            password: password,
        })

    }

    async sendLinkForMailVerification(email: string) {
        if (!email.trim()) {
            throw new Error("email is missing");
        }

        return await this.auth.generateEmailVerificationLink(email);
    }

    async sendMailForResetPassword(email: string) {
        if (!email.trim()) {
            throw new Error("email is missing");
        }

        return this.auth.generatePasswordResetLink(email);
    }
}