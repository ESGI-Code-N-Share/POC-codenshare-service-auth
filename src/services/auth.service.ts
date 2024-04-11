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

    async sendMailForEmailVerification(email: string) {
        if (!email.trim()) {
            throw new Error("email is missing");
        }

        //todo: https://stackoverflow.com/questions/41882626/firebase-admin-sdk-create-user-and-send-verification-email
        this.auth.generateEmailVerificationLink(email).then(async (link) => {
            console.log(`Mail sent to ${email} : ${link}`);
        }).catch((e) => {
            console.error(`Error to send email to ${email} cause of ${e}`)
        })
    }

    async sendMailForResetPassword(email: string) {
        if (!email.trim()) {
            throw new Error("email is missing");
        }

        //todo: https://stackoverflow.com/questions/41882626/firebase-admin-sdk-create-user-and-send-verification-email
        this.auth.generatePasswordResetLink(email).then((link) => {
            console.log(`Mail sent to ${email} : ${link}`);
        }).catch((e) => {
            console.error(`Error to send email to ${email} cause of ${e}`)
        })
    }
}