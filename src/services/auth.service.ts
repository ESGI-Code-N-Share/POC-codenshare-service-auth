import {Auth} from "firebase-admin/auth";
import {getFirebase} from "./firebase.service";


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

    async admin() {
        console.log("Authorisé")
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
            password: password
        })

    }
}