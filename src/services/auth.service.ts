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
        console.log("Check Token ...")
        return this.auth.verifyIdToken(token);
    }

    // async signUp() {
    //     // console.log(this.auth)
    //     console.log("Login .....")
    //
    //     // todo: logique métier
    //     // signUpWithEmailAndPassword(mail, password);
    //
    //     // todo: set role of user with uuid in firestore
    //
    //     // todo : return user or token
    //
    // }
}